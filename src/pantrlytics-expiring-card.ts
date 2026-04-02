import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { PantrlyticsBase } from "./pantrlytics-base";

interface ExpiringItem {
  id: number;
  serial_number: string;
  name: string;
  category: string | null;
  location: string | null;
  use_by_date: string;
  days_remaining: number;
  quantity: number;
}

interface Config {
  type: string;
  url: string;
  days?: number;
  max_items?: number;
  refresh_interval?: number;
  title?: string;
}

@customElement("pantrlytics-expiring-card")
export class PantrlyticsExpiringCard extends PantrlyticsBase {
  @state() private _config: Config | null = null;
  @state() private _items: ExpiringItem[] = [];
  @state() private _error: string | null = null;
  @state() private _loading = true;

  private _timer: ReturnType<typeof setInterval> | null = null;

  static styles = css`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .card-header h2 { margin: 0; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .badge { font-size: 0.75rem; background: var(--pl-accent); color: white; padding: 2px 7px; border-radius: 10px; }
    .item-list { display: flex; flex-direction: column; gap: 4px; }
    .item-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 7px 10px; border-radius: 6px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      text-decoration: none; color: var(--primary-text-color); font-size: 0.88rem;
    }
    .item-row:hover { background: var(--secondary-background-color, #f5f5f5); }
    .item-info { display: flex; flex-direction: column; gap: 1px; }
    .item-name { font-weight: 500; }
    .item-meta { font-size: 0.75rem; color: var(--secondary-text-color); }
    .item-days { font-weight: bold; font-size: 0.85rem; min-width: 44px; text-align: right; }
    .days-expired { color: #b71c1c; } .days-soon { color: #e65100; } .days-ok { color: #2e7d32; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
  `;

  setConfig(config: Config) {
    if (!config.url) throw new Error("url is required");
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetch();
    const interval = (this._config?.refresh_interval ?? 300) * 1000;
    this._timer = setInterval(() => this._fetch(), interval);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearInterval(this._timer);
  }

  private async _fetch() {
    if (!this._config) return;
    const days = this._config.days ?? 7;
    const max = this._config.max_items ?? 10;
    try {
      const res = await this._apiFetch(this._config.url, `/api/items/expiring?days=${days}&max_items=${max}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this._items = await res.json();
      this._error = null;
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._loading = false;
    }
  }

  private _daysLabel(days: number) {
    if (days < 0) return `${Math.abs(days)}d ago`;
    if (days === 0) return "Today";
    return `${days}d`;
  }

  private _daysClass(days: number) {
    if (days < 0) return "days-expired";
    if (days <= 3) return "days-soon";
    return "days-ok";
  }

  render() {
    if (!this._config) return nothing;
    if (this._loading) return html`<ha-card><div class="no-data">Loading…</div></ha-card>`;
    if (this._error) return html`<ha-card><div class="no-data">Error: ${this._error}</div></ha-card>`;

    return html`
      <ha-card>
        <div class="card-header">
          <h2>${this._config.title ?? "Expiring Soon"}</h2>
          ${this._items.length > 0 ? html`<span class="badge">${this._items.length}</span>` : nothing}
        </div>
        ${this._items.length === 0
          ? html`<div class="no-data">Nothing expiring soon</div>`
          : html`<div class="item-list">
              ${this._items.map((item) => html`
                <a class="item-row" href="${this._navUrl(this._config!.url, `/item/${item.id}`)}" target="_blank">
                  <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-meta">
                      ${[item.location, item.category].filter(Boolean).join(" · ")}
                      ${item.quantity > 1 ? ` · qty ${item.quantity}` : ""}
                    </span>
                  </div>
                  <span class="item-days ${this._daysClass(item.days_remaining)}">
                    ${this._daysLabel(item.days_remaining)}
                  </span>
                </a>`)}
            </div>`}
      </ha-card>
    `;
  }

  static getConfigElement() { return document.createElement("pantrlytics-expiring-card-editor"); }
  static getStubConfig() { return { url: "http://homeassistant.local:8099", days: 7 }; }
}
