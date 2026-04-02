import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { PantrlyticsBase } from "./pantrlytics-base";

interface ActionItem {
  severity: "danger" | "warn" | "info";
  text: string;
  bucket: string | null;
}

interface HealthScoreData {
  total_active: number;
  score: number | null;
  grade: string | null;
  compliance: number;
  coverage: number;
  audit: number;
  waste_rate: number | null;
  action_items: ActionItem[];
}

interface Config {
  type: string;
  url: string;
  refresh_interval?: number;
  title?: string;
}

@customElement("pantrlytics-reports-card")
export class PantrlyticsReportsCard extends PantrlyticsBase {
  @state() private _config: Config | null = null;
  @state() private _data: HealthScoreData | null = null;
  @state() private _error: string | null = null;
  @state() private _loading = true;

  private _timer: ReturnType<typeof setInterval> | null = null;

  static styles = css`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .card-header h2 { margin: 0; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .score-row { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
    .score-circle {
      width: 72px; height: 72px; border-radius: 50%;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      flex-shrink: 0; font-weight: bold; color: white;
    }
    .score-circle .number { font-size: 1.5rem; line-height: 1; }
    .score-circle .grade { font-size: 0.9rem; opacity: 0.9; }
    .score-a { background: #2e7d32; } .score-b { background: #558b2f; }
    .score-c { background: #f57f17; } .score-d { background: #e65100; }
    .score-f { background: #b71c1c; } .score-none { background: var(--secondary-text-color); }
    .breakdown { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .breakdown-row { display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--secondary-text-color); }
    .breakdown-row span:last-child { font-weight: 500; color: var(--primary-text-color); }
    .actions { margin-top: 8px; display: flex; flex-direction: column; gap: 6px; }
    .action-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; padding: 6px 8px; border-radius: 6px; }
    .action-danger { background: rgba(183,28,28,0.1); color: #b71c1c; }
    .action-warn   { background: rgba(245,127,23,0.1); color: #e65100; }
    .action-info   { background: rgba(2,119,189,0.1);  color: #0277bd; }
    .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .dot-danger { background: #b71c1c; } .dot-warn { background: #e65100; } .dot-info { background: #0277bd; }
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
    const interval = (this._config?.refresh_interval ?? 600) * 1000;
    this._timer = setInterval(() => this._fetch(), interval);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearInterval(this._timer);
  }

  private async _fetch() {
    if (!this._config) return;
    try {
      const res = await this._apiFetch(this._config.url, "/api/health-score");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this._data = await res.json();
      this._error = null;
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._loading = false;
    }
  }

  private _scoreClass(grade: string | null) {
    return grade ? `score-${grade.toLowerCase()}` : "score-none";
  }

  render() {
    if (!this._config) return nothing;
    if (this._loading) return html`<ha-card><div class="no-data">Loading…</div></ha-card>`;
    if (this._error) return html`<ha-card><div class="no-data">Error: ${this._error}</div></ha-card>`;
    if (!this._data || this._data.total_active === 0) return html`<ha-card><div class="no-data">No inventory data</div></ha-card>`;

    const d = this._data;
    return html`
      <ha-card>
        <div class="card-header"><h2>${this._config.title ?? "Inventory Health"}</h2></div>
        <div class="score-row">
          <div class="score-circle ${this._scoreClass(d.grade)}">
            <span class="number">${d.score ?? "—"}</span>
            <span class="grade">${d.grade ?? ""}</span>
          </div>
          <div class="breakdown">
            <div class="breakdown-row"><span>Compliance</span><span>${d.compliance}%</span></div>
            <div class="breakdown-row"><span>Coverage</span><span>${d.coverage}%</span></div>
            <div class="breakdown-row"><span>Audit</span><span>${d.audit}%</span></div>
          </div>
        </div>
        ${d.action_items.length > 0
          ? html`<div class="actions">
              ${d.action_items.map((a) => html`
                <div class="action-item action-${a.severity}">
                  <span class="dot dot-${a.severity}"></span>${a.text}
                </div>`)}
            </div>`
          : html`<div class="no-data" style="padding:8px 0">All clear — no action items</div>`}
        <a class="open-link" href="${this._navUrl(this._config.url, '/reports')}" target="_blank">Open Reports →</a>
      </ha-card>
    `;
  }

  static getConfigElement() { return document.createElement("pantrlytics-reports-card-editor"); }
  static getStubConfig() { return { url: "http://homeassistant.local:8099" }; }
}
