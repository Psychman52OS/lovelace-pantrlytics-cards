import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Shared helper — fires config-changed when ha-form reports a value change.
 */
function onValueChanged(this: LitElement, ev: CustomEvent) {
  this.dispatchEvent(
    new CustomEvent("config-changed", { detail: { config: ev.detail.value } })
  );
}

// ---------------------------------------------------------------------------
// Stats card editor
// ---------------------------------------------------------------------------
@customElement("pantrlytics-stats-card-editor")
export class PantrlyticsStatsCardEditor extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) _config: any;

  setConfig(config: any) {
    this._config = config;
  }

  private _schema = [
    { name: "url",              label: "PantrLytics URL",            required: true,  selector: { text: {} } },
    { name: "title",            label: "Card title (optional)",                        selector: { text: {} } },
    { name: "refresh_interval", label: "Refresh interval (seconds)",                  selector: { number: { min: 30, max: 3600, step: 30, mode: "box" } } },
  ];

  render() {
    if (!this._config || !this.hass) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${onValueChanged.bind(this)}
      ></ha-form>
    `;
  }
}

// ---------------------------------------------------------------------------
// Expiring card editor
// ---------------------------------------------------------------------------
@customElement("pantrlytics-expiring-card-editor")
export class PantrlyticsExpiringCardEditor extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) _config: any;

  setConfig(config: any) {
    this._config = config;
  }

  private _schema = [
    { name: "url",              label: "PantrLytics URL",            required: true,  selector: { text: {} } },
    { name: "title",            label: "Card title (optional)",                        selector: { text: {} } },
    { name: "days",             label: "Days ahead to show",                           selector: { number: { min: 1, max: 90,   step: 1,  mode: "box" } } },
    { name: "max_items",        label: "Max items to show",                            selector: { number: { min: 1, max: 50,   step: 1,  mode: "box" } } },
    { name: "refresh_interval", label: "Refresh interval (seconds)",                  selector: { number: { min: 30, max: 3600, step: 30, mode: "box" } } },
  ];

  render() {
    if (!this._config || !this.hass) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${onValueChanged.bind(this)}
      ></ha-form>
    `;
  }
}

// ---------------------------------------------------------------------------
// Reports card editor
// ---------------------------------------------------------------------------
@customElement("pantrlytics-reports-card-editor")
export class PantrlyticsReportsCardEditor extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) _config: any;

  setConfig(config: any) {
    this._config = config;
  }

  private _schema = [
    { name: "url",              label: "PantrLytics URL",            required: true,  selector: { text: {} } },
    { name: "title",            label: "Card title (optional)",                        selector: { text: {} } },
    { name: "refresh_interval", label: "Refresh interval (seconds)",                  selector: { number: { min: 30, max: 3600, step: 30, mode: "box" } } },
  ];

  render() {
    if (!this._config || !this.hass) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${onValueChanged.bind(this)}
      ></ha-form>
    `;
  }
}

// ---------------------------------------------------------------------------
// Quick Add card editor
// ---------------------------------------------------------------------------
@customElement("pantrlytics-quick-add-card-editor")
export class PantrlyticsQuickAddCardEditor extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) _config: any;

  setConfig(config: any) {
    this._config = config;
  }

  private _schema = [
    { name: "url",   label: "PantrLytics URL",       required: true, selector: { text: {} } },
    { name: "title", label: "Card title (optional)",                  selector: { text: {} } },
    {
      type: "expandable",
      title: "Fields to show",
      schema: [
        { name: "show_category",      label: "Category",                selector: { boolean: {} } },
        { name: "show_tags",          label: "Tags",                    selector: { boolean: {} } },
        { name: "show_location",      label: "Location",                selector: { boolean: {} } },
        { name: "show_bin",           label: "Bin #",                   selector: { boolean: {} } },
        { name: "show_quantity",      label: "Quantity",                selector: { boolean: {} } },
        { name: "show_unit",          label: "Unit",                    selector: { boolean: {} } },
        { name: "show_condition",     label: "Condition",               selector: { boolean: {} } },
        { name: "show_origin_date",   label: "Origin Date",             selector: { boolean: {} } },
        { name: "show_use_by_date",   label: "Use-by Date",             selector: { boolean: {} } },
        { name: "show_use_within",    label: "Use Within",              selector: { boolean: {} } },
        { name: "show_review_window", label: "Review Window",           selector: { boolean: {} } },
        { name: "show_notes",         label: "Notes",                   selector: { boolean: {} } },
      ],
    },
  ];

  render() {
    if (!this._config || !this.hass) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${onValueChanged.bind(this)}
      ></ha-form>
    `;
  }
}

// ---------------------------------------------------------------------------
// Status card editor
// ---------------------------------------------------------------------------
@customElement("pantrlytics-status-card-editor")
export class PantrlyticsStatusCardEditor extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) _config: any;

  setConfig(config: any) {
    this._config = config;
  }

  private _schema = [
    { name: "url",              label: "PantrLytics URL",            required: true, selector: { text: {} } },
    { name: "title",            label: "Card title (app name, optional)",             selector: { text: {} } },
    { name: "refresh_interval", label: "Refresh interval (seconds)",                 selector: { number: { min: 30, max: 3600, step: 30, mode: "box" } } },
    {
      type: "expandable",
      title: "Rows to show",
      schema: [
        { name: "show_ipp",     label: "IPP Printer status",  selector: { boolean: {} } },
        { name: "show_storage", label: "App Storage",         selector: { boolean: {} } },
        { name: "show_items",   label: "Active / Total Items", selector: { boolean: {} } },
      ],
    },
  ];

  render() {
    if (!this._config || !this.hass) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${onValueChanged.bind(this)}
      ></ha-form>
    `;
  }
}

// ---------------------------------------------------------------------------
// Quick Adjust card editor
// ---------------------------------------------------------------------------
@customElement("pantrlytics-quick-adjust-card-editor")
export class PantrlyticsQuickAdjustCardEditor extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) _config: any;

  setConfig(config: any) {
    this._config = config;
  }

  private _schema = [
    { name: "url",       label: "PantrLytics URL",       required: true, selector: { text: {} } },
    { name: "title",     label: "Card title (optional)",                  selector: { text: {} } },
    {
      type: "expandable",
      title: "Items (up to 10)",
      schema: [
        { name: "item_id_1",  label: "Item 1 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_2",  label: "Item 2 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_3",  label: "Item 3 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_4",  label: "Item 4 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_5",  label: "Item 5 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_6",  label: "Item 6 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_7",  label: "Item 7 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_8",  label: "Item 8 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_9",  label: "Item 9 ID",  selector: { number: { min: 1, step: 1, mode: "box" } } },
        { name: "item_id_10", label: "Item 10 ID", selector: { number: { min: 1, step: 1, mode: "box" } } },
      ],
    },
  ];

  render() {
    if (!this._config || !this.hass) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${onValueChanged.bind(this)}
      ></ha-form>
    `;
  }
}
