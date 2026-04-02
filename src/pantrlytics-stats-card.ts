import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { PantrlyticsBase } from "./pantrlytics-base";

interface StatsData {
  total_active: number;
  expiring_7_days: number;
  depleted_today: number;
}

interface Config {
  type: string;
  url: string;
  refresh_interval?: number;
  title?: string;
}

@customElement("pantrlytics-stats-card")
export class PantrlyticsStatsCard extends PantrlyticsBase {
  @state() private _config: Config | null = null;
  @state() private _data: StatsData | null = null;
  @state() private _error: string | null = null;
  @state() private _loading = true;

  private _timer: ReturnType<typeof setInterval> | null = null;

  static styles = css`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header h2 { margin: 0 0 12px; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .stat-box {
      display: flex; flex-direction: column; align-items: center;
      padding: 12px 8px; border-radius: 8px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    .stat-value { font-size: 1.8rem; font-weight: bold; line-height: 1; color: var(--primary-text-color); }
    .stat-label { font-size: 0.72rem; color: var(--secondary-text-color); text-align: center; margin-top: 4px; }
    .stat-warn .stat-value { color: #e65100; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
    .open-link { display: block; margin-top: 12px; text-align: right; font-size: 0.8rem; color: var(--pl-accent); text-decoration: none; }
    .open-link:hover { text-decoration: underline; }
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
    try {
      const res = await this._apiFetch(this._config.url, "/api/stats");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this._data = await res.json();
      this._error = null;
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (!this._config) return nothing;
    if (this._loading) return html`<ha-card><div class="no-data">Loading…</div></ha-card>`;
    if (this._error) return html`<ha-card><div class="no-data">Error: ${this._error}</div></ha-card>`;
    if (!this._data) return html`<ha-card><div class="no-data">No data</div></ha-card>`;

    const d = this._data;
    const warnClass = d.expiring_7_days > 0 ? "stat-warn" : "";

    return html`
      <ha-card>
        <div class="card-header"><h2>${this._config.title ?? "PantrLytics"}</h2></div>
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-value">${d.total_active}</span>
            <span class="stat-label">Active Items</span>
          </div>
          <div class="stat-box ${warnClass}">
            <span class="stat-value">${d.expiring_7_days}</span>
            <span class="stat-label">Expiring (7d)</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">${d.depleted_today}</span>
            <span class="stat-label">Used Today</span>
          </div>
        </div>
        <a class="open-link" href="${this._navUrl(this._config.url, '/')}" target="_blank">Open PantrLytics →</a>
      </ha-card>
    `;
  }

  static getConfigElement() { return document.createElement("pantrlytics-stats-card-editor"); }
  static getStubConfig() { return { url: "http://homeassistant.local:8099" }; }
}
