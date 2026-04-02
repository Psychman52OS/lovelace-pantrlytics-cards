import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { PantrlyticsBase } from "./pantrlytics-base";

interface FormData {
  categories: string[];
  bins: string[];
  locations: string[];
  use_withins: string[];
  units: string[];
  origin_date_labels: string[];
  required_fields: string[];
  audit_window_days: number;
}

interface Config {
  type: string;
  url: string;
  title?: string;
  // Per-field visibility (default shown: name always, others listed below)
  show_category?: boolean;
  show_tags?: boolean;
  show_location?: boolean;
  show_bin?: boolean;
  show_quantity?: boolean;
  show_unit?: boolean;
  show_condition?: boolean;
  show_origin_date?: boolean;
  show_use_by_date?: boolean;
  show_use_within?: boolean;
  show_review_window?: boolean;
  show_notes?: boolean;
}

// Fields shown by default when not specified in config
const DEFAULTS: Record<string, boolean> = {
  show_category: true,
  show_tags: false,
  show_location: true,
  show_bin: false,
  show_quantity: true,
  show_unit: false,
  show_condition: false,
  show_origin_date: false,
  show_use_by_date: true,
  show_use_within: true,
  show_review_window: false,
  show_notes: true,
};

@customElement("pantrlytics-quick-add-card")
export class PantrlyticsQuickAddCard extends PantrlyticsBase {
  @state() private _config: Config | null = null;
  @state() private _formData: FormData | null = null;
  @state() private _loading = true;
  @state() private _submitting = false;
  @state() private _success: { item_id: number; serial_number: string } | null = null;
  @state() private _error: string | null = null;

  @state() private _name = "";
  @state() private _category = "";
  @state() private _tags = "";
  @state() private _location = "";
  @state() private _binNumber = "";
  @state() private _quantity = 1;
  @state() private _unit = "";
  @state() private _condition = "";
  @state() private _originDateLabel = "Cooked On";
  @state() private _originDate = "";
  @state() private _useByDate = "";
  @state() private _useWithin = "";
  @state() private _reviewWindowDays = "";
  @state() private _notes = "";

  static styles = css`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; }
    .card-header h2 { margin: 0 0 14px; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .form { display: flex; flex-direction: column; gap: 10px; }
    .field { display: flex; flex-direction: column; gap: 3px; }
    label { font-size: 0.78rem; color: var(--secondary-text-color); }
    input, select, textarea {
      padding: 7px 10px; border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px; background: var(--card-background-color, #fff);
      color: var(--primary-text-color); font-size: 0.9rem;
      width: 100%; box-sizing: border-box;
    }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--pl-accent); }
    .row { display: grid; grid-template-columns: 2fr 1fr; gap: 8px; }
    .row-half { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    textarea { resize: vertical; min-height: 56px; }
    .btn-row { display: flex; gap: 8px; margin-top: 4px; }
    button { flex: 1; padding: 9px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 500; }
    .btn-submit { background: var(--pl-accent); color: white; }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-clear { background: var(--divider-color, #e0e0e0); color: var(--primary-text-color); }
    .success-box { padding: 12px; background: rgba(46,125,50,0.1); border-radius: 8px; color: #2e7d32; font-size: 0.88rem; margin-bottom: 10px; }
    .success-box a { color: #2e7d32; font-weight: 500; }
    .error-box { padding: 8px 12px; background: rgba(183,28,28,0.1); border-radius: 6px; color: #b71c1c; font-size: 0.85rem; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }
  `;

  setConfig(config: Config) {
    if (!config.url) throw new Error("url is required");
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchFormData();
  }

  /** Returns true if the named field should be shown given the current config. */
  private _show(field: string): boolean {
    if (!this._config) return DEFAULTS[field] ?? true;
    const val = (this._config as any)[field];
    return val === undefined ? (DEFAULTS[field] ?? true) : val;
  }

  private async _fetchFormData() {
    if (!this._config) return;
    try {
      const res = await this._apiFetch(this._config.url, "/api/form-data");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this._formData = await res.json();
      this._error = null;
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._loading = false;
    }
  }

  private async _submit(e: Event) {
    e.preventDefault();
    if (!this._config || !this._name.trim()) return;
    this._submitting = true;
    this._error = null;
    this._success = null;
    try {
      const res = await this._apiFetch(this._config.url, "/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this._name,
          category: this._category || undefined,
          tags: this._tags || undefined,
          location: this._location || undefined,
          bin_number: this._binNumber || undefined,
          quantity: this._quantity,
          unit: this._unit || undefined,
          condition: this._condition || undefined,
          origin_date_label: this._originDate ? (this._originDateLabel || "Cooked On") : undefined,
          origin_date: this._originDate || undefined,
          use_by_date: this._useByDate || undefined,
          use_within: this._useWithin || undefined,
          review_window_days: this._reviewWindowDays ? parseInt(this._reviewWindowDays) : undefined,
          notes: this._notes || undefined,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        this._error = data.error ?? "Unknown error";
      } else {
        this._success = { item_id: data.item_id, serial_number: data.serial_number };
        this._clearForm();
      }
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._submitting = false;
    }
  }

  private _clearForm() {
    this._name = ""; this._category = ""; this._tags = "";
    this._location = ""; this._binNumber = "";
    this._quantity = 1; this._unit = ""; this._condition = "";
    this._originDateLabel = "Cooked On"; this._originDate = "";
    this._useByDate = ""; this._useWithin = "";
    this._reviewWindowDays = ""; this._notes = "";
  }

  render() {
    if (!this._config) return nothing;
    if (this._loading) return html`<ha-card><div class="no-data">Loading…</div></ha-card>`;

    const fd = this._formData;
    const req = fd?.required_fields ?? [];

    return html`
      <ha-card>
        <div class="card-header"><h2>${this._config.title ?? "Quick Add Item"}</h2></div>
        ${this._success
          ? html`<div class="success-box">
              Added <a href="${this._navUrl(this._config.url, `/item/${this._success.item_id}`)}" target="_blank">${this._success.serial_number}</a> — created successfully.
            </div>`
          : nothing}
        ${this._error ? html`<div class="error-box">${this._error}</div>` : nothing}
        <form class="form" @submit=${this._submit}>

          <div class="field">
            <label>Name${req.includes("name") ? " *" : ""}</label>
            <input type="text" .value=${this._name}
              @input=${(e: Event) => (this._name = (e.target as HTMLInputElement).value)}
              placeholder="Item name" required />
          </div>

          ${this._show("show_category") ? html`
          <div class="field">
            <label>Category${req.includes("category") ? " *" : ""}</label>
            <input type="text" list="pl-cats" .value=${this._category}
              @input=${(e: Event) => (this._category = (e.target as HTMLInputElement).value)}
              placeholder="Category" />
            <datalist id="pl-cats">
              ${fd?.categories.map((c) => html`<option value=${c}></option>`) ?? nothing}
            </datalist>
          </div>` : nothing}

          ${this._show("show_tags") ? html`
          <div class="field">
            <label>Tags${req.includes("tags") ? " *" : ""} <span style="font-size:0.72rem;opacity:.7">(comma-separated)</span></label>
            <input type="text" .value=${this._tags}
              @input=${(e: Event) => (this._tags = (e.target as HTMLInputElement).value)}
              placeholder="tag1, tag2" />
          </div>` : nothing}

          ${this._show("show_location") ? html`
          <div class="field">
            <label>Location${req.includes("location") ? " *" : ""}</label>
            <input type="text" list="pl-locs" .value=${this._location}
              @input=${(e: Event) => (this._location = (e.target as HTMLInputElement).value)}
              placeholder="Where is it stored?" />
            <datalist id="pl-locs">
              ${fd?.locations.map((l) => html`<option value=${l}></option>`) ?? nothing}
            </datalist>
          </div>` : nothing}

          ${this._show("show_bin") ? html`
          <div class="field">
            <label>Bin #${req.includes("bin_number") ? " *" : ""}</label>
            <input type="text" list="pl-bins" .value=${this._binNumber}
              @input=${(e: Event) => (this._binNumber = (e.target as HTMLInputElement).value)}
              placeholder="Bin number" />
            <datalist id="pl-bins">
              ${fd?.bins.map((b) => html`<option value=${b}></option>`) ?? nothing}
            </datalist>
          </div>` : nothing}

          ${this._show("show_quantity") || this._show("show_unit") ? html`
          <div class="row-half">
            ${this._show("show_quantity") ? html`
            <div class="field">
              <label>Qty${req.includes("quantity") ? " *" : ""}</label>
              <input type="number" min="0" .value=${String(this._quantity)}
                @input=${(e: Event) => (this._quantity = parseInt((e.target as HTMLInputElement).value) || 1)} />
            </div>` : nothing}
            ${this._show("show_unit") ? html`
            <div class="field">
              <label>Unit${req.includes("unit") ? " *" : ""}</label>
              <input type="text" list="pl-units" .value=${this._unit}
                @input=${(e: Event) => (this._unit = (e.target as HTMLInputElement).value)}
                placeholder="each" />
              <datalist id="pl-units">
                ${fd?.units.map((u) => html`<option value=${u}></option>`) ?? nothing}
              </datalist>
            </div>` : nothing}
          </div>` : nothing}

          ${this._show("show_condition") ? html`
          <div class="field">
            <label>Condition${req.includes("condition") ? " *" : ""}</label>
            <input type="text" .value=${this._condition}
              @input=${(e: Event) => (this._condition = (e.target as HTMLInputElement).value)}
              placeholder="new / good / used / frozen" />
          </div>` : nothing}

          ${this._show("show_origin_date") ? html`
          <div class="row">
            <div class="field">
              <label>Origin Date${req.includes("origin_date") ? " *" : ""}</label>
              <input type="date" .value=${this._originDate}
                @input=${(e: Event) => (this._originDate = (e.target as HTMLInputElement).value)} />
            </div>
            <div class="field">
              <label>Label</label>
              <select @change=${(e: Event) => (this._originDateLabel = (e.target as HTMLSelectElement).value)}>
                ${(fd?.origin_date_labels ?? ["Cooked On"]).map((l) => html`
                  <option value=${l} ?selected=${l === this._originDateLabel}>${l}</option>`)}
              </select>
            </div>
          </div>` : nothing}

          ${this._show("show_use_by_date") || this._show("show_use_within") ? html`
          <div class="row">
            ${this._show("show_use_by_date") ? html`
            <div class="field">
              <label>Use-by Date${req.includes("use_by_date") ? " *" : ""}</label>
              <input type="date" .value=${this._useByDate}
                @input=${(e: Event) => (this._useByDate = (e.target as HTMLInputElement).value)} />
            </div>` : nothing}
            ${this._show("show_use_within") ? html`
            <div class="field">
              <label>Use Within${req.includes("use_within") ? " *" : ""}</label>
              <select @change=${(e: Event) => (this._useWithin = (e.target as HTMLSelectElement).value)}>
                <option value="">—</option>
                ${fd?.use_withins.map((u) => html`<option value=${u} ?selected=${u === this._useWithin}>${u}</option>`) ?? nothing}
              </select>
            </div>` : nothing}
          </div>` : nothing}

          ${this._show("show_review_window") ? html`
          <div class="field">
            <label>Review window (days${fd ? `, default ${fd.audit_window_days}d` : ""})</label>
            <input type="number" min="1" max="365" .value=${this._reviewWindowDays}
              @input=${(e: Event) => (this._reviewWindowDays = (e.target as HTMLInputElement).value)}
              placeholder="Use default" />
          </div>` : nothing}

          ${this._show("show_notes") ? html`
          <div class="field">
            <label>Notes${req.includes("notes") ? " *" : ""}</label>
            <textarea .value=${this._notes}
              @input=${(e: Event) => (this._notes = (e.target as HTMLTextAreaElement).value)}
              placeholder="Optional notes"></textarea>
          </div>` : nothing}

          <div class="btn-row">
            <button type="submit" class="btn-submit" ?disabled=${this._submitting || !this._name.trim()}>
              ${this._submitting ? "Adding…" : "Add Item"}
            </button>
            <button type="button" class="btn-clear" @click=${this._clearForm}>Clear</button>
          </div>
        </form>
      </ha-card>
    `;
  }

  static getConfigElement() { return document.createElement("pantrlytics-quick-add-card-editor"); }
  static getStubConfig() { return { url: "http://homeassistant.local:8099" }; }
}
