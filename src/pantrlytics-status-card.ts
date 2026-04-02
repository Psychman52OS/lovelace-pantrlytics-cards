import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { PantrlyticsBase } from "./pantrlytics-base";

interface Storage {
  total: number;
  db: number;
  photos: number;
  backups: number;
  other: number;
}

interface HealthStatus {
  version: string;
  ipp_status: string;
  ipp_host: string;
  ipp_printer: string;
  storage: Storage;
  total_items: number;
  active_items: number;
}

interface Config {
  type: string;
  url: string;
  title?: string;
  refresh_interval?: number;
  show_ipp?: boolean;
  show_storage?: boolean;
  show_items?: boolean;
}

function fmtBytes(b: number): string {
  if (b >= 1_048_576) return `${(b / 1_048_576).toFixed(1)} MB`;
  if (b >= 1_024)     return `${Math.round(b / 1_024)} KB`;
  return `${b} B`;
}

@customElement("pantrlytics-status-card")
export class PantrlyticsStatusCard extends PantrlyticsBase {
  @state() private _config: Config | null = null;
  @state() private _data: HealthStatus | null = null;
  @state() private _error: string | null = null;
  @state() private _loading = true;
  @state() private _storageOpen = false;

  private _timer: ReturnType<typeof setInterval> | null = null;

  static styles = css`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .card-header-text h2 { margin: 0; font-size: 1rem; font-weight: 600; color: var(--primary-text-color); line-height: 1.2; }
    .card-subtitle { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 2px; }
    .version { font-size: 0.75rem; color: var(--secondary-text-color); white-space: nowrap; padding-top: 2px; }
    .row-list { display: flex; flex-direction: column; gap: 6px; }
    .row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      font-size: 0.88rem;
    }
    .row-label { color: var(--secondary-text-color); }
    .row-value { font-weight: 500; color: var(--primary-text-color); }
    .status-dot {
      display: inline-block; width: 8px; height: 8px;
      border-radius: 50%; margin-right: 6px; flex-shrink: 0;
    }
    .dot-ok         { background: #2e7d32; }
    .dot-warn       { background: #e65100; }
    .dot-err        { background: #b71c1c; }
    .dot-none       { background: var(--secondary-text-color); }
    .storage-row { cursor: pointer; user-select: none; }
    .storage-row .chevron {
      font-size: 0.8rem; margin-left: 4px;
      display: inline-block; transition: transform 0.2s ease;
    }
    .storage-row.open .chevron { transform: rotate(180deg); }
    .storage-breakdown {
      margin-top: 4px; padding: 6px 12px;
      border-radius: 0 0 8px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-top: none;
      display: flex; flex-direction: column; gap: 4px;
    }
    .breakdown-row { display: flex; justify-content: space-between; font-size: 0.8rem; }
    .breakdown-row span:first-child { color: var(--secondary-text-color); }
    .breakdown-row span:last-child  { color: var(--primary-text-color); font-weight: 500; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
  `;

  setConfig(config: Config) {
    if (!config.url) throw new Error("url is required");
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetch();
    const interval = (this._config?.refresh_interval ?? 60) * 1000;
    this._timer = setInterval(() => this._fetch(), interval);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearInterval(this._timer);
  }

  private async _fetch() {
    if (!this._config) return;
    try {
      const res = await this._apiFetch(this._config.url, "/api/health-status");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this._data = await res.json();
      this._error = null;
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._loading = false;
    }
  }

  private _show(field: keyof Config): boolean {
    const v = this._config?.[field];
    return v === undefined ? true : Boolean(v);
  }

  private _ippDotClass(status: string): string {
    if (status === "Reachable")       return "dot-ok";
    if (status === "Not configured")  return "dot-none";
    return "dot-err";
  }

  render() {
    if (!this._config) return nothing;
    if (this._loading) return html`<ha-card><div class="no-data">Loading…</div></ha-card>`;
    if (this._error)   return html`<ha-card><div class="no-data">Error: ${this._error}</div></ha-card>`;
    if (!this._data)   return html`<ha-card><div class="no-data">No data</div></ha-card>`;

    const d = this._data;
    const s = d.storage;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="card-header-text">
            <h2>${this._config.title ?? "PantrLytics"}</h2>
            <div class="card-subtitle">App Status</div>
          </div>
          <span class="version">v${d.version}</span>
        </div>
        <div class="row-list">

          ${this._show("show_ipp") ? html`
          <div class="row">
            <span class="row-label">
              <span class="status-dot ${this._ippDotClass(d.ipp_status)}"></span>IPP Printer
            </span>
            <span class="row-value">${d.ipp_status}${d.ipp_host ? html` <span style="font-weight:400;font-size:0.8rem;color:var(--secondary-text-color);">(${d.ipp_host})</span>` : nothing}</span>
          </div>` : nothing}

          ${this._show("show_storage") ? html`
          <div class="row storage-row ${this._storageOpen ? "open" : ""}"
            @click=${() => (this._storageOpen = !this._storageOpen)}>
            <span class="row-label">App Storage</span>
            <span class="row-value">
              ${fmtBytes(s.total)}
              <span class="chevron">▾</span>
            </span>
          </div>
          ${this._storageOpen ? html`
            <div class="storage-breakdown">
              ${([
                ["Database",  s.db],
                ["Photos",    s.photos],
                ["Backups",   s.backups],
                ["Other",     s.other],
              ] as [string, number][]).map(([label, size]) => html`
                <div class="breakdown-row">
                  <span>${label}</span>
                  <span>${fmtBytes(size)}</span>
                </div>`)}
            </div>` : nothing}` : nothing}

          ${this._show("show_items") ? html`
          <div class="row">
            <span class="row-label">Active Items</span>
            <span class="row-value">${d.active_items}
              <span style="font-weight:400;font-size:0.8rem;color:var(--secondary-text-color);">/ ${d.total_items} total</span>
            </span>
          </div>` : nothing}

        </div>
      </ha-card>
    `;
  }

  static getConfigElement() { return document.createElement("pantrlytics-status-card-editor"); }
  static getStubConfig() { return { url: "http://homeassistant.local:8099" }; }
}
