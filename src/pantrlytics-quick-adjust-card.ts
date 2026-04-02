import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { PantrlyticsBase } from "./pantrlytics-base";

interface ItemDetail {
  id: number;
  serial_number: string;
  name: string;
  quantity: number;
  unit: string | null;
  location: string | null;
  category: string | null;
  use_by_date: string | null;
}

interface SwipeActions {
  right: string;
  left: string;
}

interface DepleteDialog {
  itemId: number;
  itemName: string;
  reason: string;
  depleted_at: string;
}

interface Config {
  type: string;
  url: string;
  title?: string;
  item_id?: number;
  item_id_1?: number;
  item_id_2?: number;
  item_id_3?: number;
  item_id_4?: number;
  item_id_5?: number;
  item_id_6?: number;
  item_id_7?: number;
  item_id_8?: number;
  item_id_9?: number;
  item_id_10?: number;
}

const ACTION_META: Record<string, { icon: string; label: string }> = {
  edit:    { icon: "✏️",  label: "Edit" },
  deplete: { icon: "📦", label: "Deplete" },
  open:    { icon: "🔗", label: "Open" },
  print:   { icon: "🖨️", label: "Print" },
  none:    { icon: "",    label: "" },
};
const SWIPE_THRESHOLD = 80;

@customElement("pantrlytics-quick-adjust-card")
export class PantrlyticsQuickAdjustCard extends PantrlyticsBase {
  @state() private _config: Config | null = null;
  @state() private _items: Record<number, ItemDetail> = {};
  @state() private _swipeActions: SwipeActions = { right: "edit", left: "deplete" };
  @state() private _depletionReasons: string[] = ["Consumed/Used","Discarded (expired/spoiled)","Discarded (damaged)","Donated/Returned","Lost/Missing","Restocked/Replaced (new batch)","Other"];
  @state() private _dialog: DepleteDialog | null = null;
  @state() private _loading = true;
  @state() private _adjusting: Record<number, boolean> = {};
  @state() private _flash: Record<number, string> = {};
  @state() private _error: string | null = null;

  // Swipe tracking (not reactive — updated directly on DOM)
  private _swipeState: Map<number, {
    startX: number; startY: number; dx: number;
    pointerId: number; rowEl: HTMLElement; innerEl: HTMLElement;
    committed: boolean;
  }> = new Map();

  static styles = css`
    :host { --pl-accent: #f97316; }
    @media (prefers-color-scheme: light) { :host { --pl-accent: #d97706; } }
    ha-card { padding: 16px; position: relative; }
    .card-header h2 { margin: 0 0 10px; font-size: 1rem; font-weight: 500; color: var(--primary-text-color); }
    .item-list { display: flex; flex-direction: column; gap: 8px; }

    /* Swipe wrapper */
    .item-row-wrap {
      position: relative; overflow: hidden;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    .swipe-bg {
      position: absolute; top: 0; bottom: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      width: 80px; font-size: 10px; font-weight: 700;
      letter-spacing: 0.5px; text-transform: uppercase;
      color: #fff; gap: 4px; opacity: 0;
      transition: opacity 0.1s;
      pointer-events: none;
    }
    .swipe-bg.visible { opacity: 1; }
    .swipe-bg-right { left: 0;  background: #1864ab; border-radius: 8px 0 0 8px; }
    .swipe-bg-left  { right: 0; background: #ef4444; border-radius: 0 8px 8px 0; }
    .swipe-bg .icon { font-size: 20px; line-height: 1; }

    .item-row {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px;
      background: var(--card-background-color, #1b1d22);
      will-change: transform;
      touch-action: pan-y;
      cursor: grab;
      user-select: none;
    }
    .item-row:active { cursor: grabbing; }
    @media (pointer: coarse) { .item-row { cursor: auto; } }

    .item-info { flex: 1; min-width: 0; }
    .item-name {
      font-size: 1.05rem; font-weight: 600;
      color: var(--primary-text-color);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .item-meta { font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 1px; }
    .item-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .qty-btn {
      width: 32px; height: 32px; border-radius: 50%;
      border: 2px solid var(--pl-accent);
      background: transparent; color: var(--pl-accent);
      font-size: 1.2rem; font-weight: bold; cursor: pointer;
      display: flex; align-items: center; justify-content: center; line-height: 1;
    }
    .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .qty-btn:hover:not(:disabled) { background: var(--pl-accent); color: white; }
    .qty-display { font-size: 1.3rem; font-weight: bold; min-width: 32px; text-align: center; color: var(--primary-text-color); }
    .qty-unit { font-size: 0.7rem; color: var(--secondary-text-color); text-align: center; }
    .flash { font-size: 0.75rem; color: #2e7d32; margin-top: 1px; }
    .error-box { padding: 8px 12px; background: rgba(183,28,28,0.1); border-radius: 6px; color: #b71c1c; font-size: 0.85rem; margin-top: 8px; }
    .no-data { color: var(--secondary-text-color); font-size: 0.9rem; text-align: center; padding: 16px 0; }

    /* Deplete dialog */
    .dialog-overlay {
      position: absolute; inset: 0; z-index: 10;
      background: rgba(0,0,0,0.55); border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
    }
    .dialog {
      background: var(--card-background-color, #1b1d22);
      border: 1px solid var(--divider-color, #2a2f36);
      border-radius: 10px; padding: 16px; width: 90%; max-width: 320px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .dialog h3 { margin: 0; font-size: 0.95rem; font-weight: 600; color: var(--primary-text-color); }
    .dialog-item { font-size: 0.85rem; color: var(--secondary-text-color); }
    .dialog label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .dialog select, .dialog input[type="datetime-local"] {
      padding: 7px 10px; border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px; background: var(--card-background-color, #fff);
      color: var(--primary-text-color); font-size: 0.88rem;
      width: 100%; box-sizing: border-box;
    }
    .dialog-field { display: flex; flex-direction: column; gap: 3px; }
    .dialog-buttons { display: flex; gap: 8px; margin-top: 4px; }
    .dialog-buttons button { flex: 1; padding: 8px; border: none; border-radius: 6px; font-size: 0.88rem; font-weight: 500; cursor: pointer; }
    .btn-confirm { background: #ef4444; color: white; }
    .btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-cancel  { background: var(--divider-color, #e0e0e0); color: var(--primary-text-color); }
  `;

  setConfig(config: Config) {
    if (!config.url) throw new Error("url is required");
    this._config = config;
  }

  private _configuredIds(): number[] {
    if (!this._config) return [];
    const ids: number[] = [];
    if (this._config.item_id) ids.push(Number(this._config.item_id));
    for (let i = 1; i <= 10; i++) {
      const id = (this._config as any)[`item_id_${i}`];
      if (id) ids.push(Number(id));
    }
    return [...new Set(ids)];
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchAll();
  }

  private async _fetchAll() {
    const ids = this._configuredIds();
    if (!ids.length || !this._config) return;
    try {
      const [itemResults, fdRes] = await Promise.all([
        Promise.all(
          ids.map((id) =>
            this._apiFetch(this._config!.url, `/api/items/${id}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null)
          )
        ),
        this._apiFetch(this._config.url, "/api/form-data")
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);
      const items: Record<number, ItemDetail> = {};
      for (const item of itemResults) {
        if (item?.id) items[item.id] = item;
      }
      this._items = items;
      if (fdRes?.swipe_actions) this._swipeActions = fdRes.swipe_actions;
      if (fdRes?.depletion_reasons?.length) this._depletionReasons = fdRes.depletion_reasons;
      this._error = null;
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._loading = false;
    }
  }

  private async _adjust(itemId: number, delta: number) {
    if (!this._config || this._adjusting[itemId]) return;
    this._adjusting = { ...this._adjusting, [itemId]: true };
    this._flash = { ...this._flash, [itemId]: "" };
    try {
      const res = await this._apiFetch(this._config.url, `/item/${itemId}/adjust-qty`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "xmlhttprequest" },
        body: `delta=${delta}`,
      });
      const data = await res.json();
      if (data.ok) {
        this._items = { ...this._items, [itemId]: { ...this._items[itemId], quantity: data.quantity } };
        this._flash = { ...this._flash, [itemId]: delta > 0 ? `+${delta}` : `${delta}` };
        setTimeout(() => { this._flash = { ...this._flash, [itemId]: "" }; }, 2000);
      } else {
        this._error = data.reason === "depleted" ? "Item fully depleted" : "Cannot adjust quantity";
      }
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._adjusting = { ...this._adjusting, [itemId]: false };
    }
  }

  private _runSwipeAction(itemId: number, action: string) {
    if (!this._config) return;
    if (action === "deplete") {
      const item = this._items[itemId];
      if (!item) return;
      // Format local datetime-local string (YYYY-MM-DDTHH:MM)
      const now = new Date();
      const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString().slice(0, 16);
      this._dialog = {
        itemId,
        itemName: item.name,
        reason: this._depletionReasons[0] ?? "",
        depleted_at: local,
      };
    } else if (action === "edit" || action === "open" || action === "print") {
      window.open(this._navUrl(this._config.url, `/item/${itemId}`), "_blank");
    }
    // "none" → do nothing
  }

  private async _confirmDeplete() {
    if (!this._config || !this._dialog) return;
    const { itemId, reason, depleted_at } = this._dialog;
    this._dialog = null;
    this._adjusting = { ...this._adjusting, [itemId]: true };
    try {
      const res = await this._apiFetch(this._config.url, `/item/${itemId}/deplete`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "xmlhttprequest" },
        body: `reason=${encodeURIComponent(reason)}&depleted_at_input=${encodeURIComponent(depleted_at)}`,
      });
      const data = await res.json();
      if (data.ok) {
        this._items = { ...this._items, [itemId]: { ...this._items[itemId], quantity: 0 } };
        this._flash = { ...this._flash, [itemId]: "Depleted" };
        setTimeout(() => { this._flash = { ...this._flash, [itemId]: "" }; }, 2500);
      } else {
        this._error = data.reason === "already_depleted" ? "Already depleted" : "Could not deplete";
      }
    } catch (e: unknown) {
      this._error = e instanceof Error ? e.message : String(e);
    } finally {
      this._adjusting = { ...this._adjusting, [itemId]: false };
    }
  }

  // ── Swipe gesture handlers ──────────────────────────────────────────────

  private _onPointerDown(e: PointerEvent, itemId: number) {
    const rowEl = (e.currentTarget as HTMLElement);
    const wrapEl = rowEl.closest(".item-row-wrap") as HTMLElement;
    if (!wrapEl || this._adjusting[itemId]) return;
    rowEl.setPointerCapture(e.pointerId);
    this._swipeState.set(itemId, {
      startX: e.clientX, startY: e.clientY, dx: 0,
      pointerId: e.pointerId, rowEl, innerEl: rowEl,
      committed: false,
    });
  }

  private _onPointerMove(e: PointerEvent, itemId: number) {
    const s = this._swipeState.get(itemId);
    if (!s) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    // Cancel if scrolling vertically
    if (!s.committed && Math.abs(dy) > Math.abs(dx) + 5) {
      this._cancelSwipe(itemId);
      return;
    }
    s.committed = true;
    s.dx = dx;
    // Move the row
    s.innerEl.style.transform = `translateX(${dx}px)`;
    s.innerEl.style.transition = "none";
    // Show/hide background panels
    const wrap = s.innerEl.closest(".item-row-wrap") as HTMLElement;
    if (wrap) {
      const bgRight = wrap.querySelector(".swipe-bg-right") as HTMLElement;
      const bgLeft  = wrap.querySelector(".swipe-bg-left")  as HTMLElement;
      if (bgRight) bgRight.classList.toggle("visible", dx > 20);
      if (bgLeft)  bgLeft.classList.toggle("visible",  dx < -20);
    }
  }

  private _onPointerUp(e: PointerEvent, itemId: number) {
    const s = this._swipeState.get(itemId);
    if (!s) return;
    const dx = s.dx;
    this._swipeState.delete(itemId);

    // Snap back with animation
    s.innerEl.style.transition = "transform 0.25s ease";
    s.innerEl.style.transform = "translateX(0)";
    const wrap = s.innerEl.closest(".item-row-wrap") as HTMLElement;
    if (wrap) {
      wrap.querySelector(".swipe-bg-right")?.classList.remove("visible");
      wrap.querySelector(".swipe-bg-left")?.classList.remove("visible");
    }

    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      const action = dx > 0 ? this._swipeActions.right : this._swipeActions.left;
      if (action && action !== "none") {
        this._runSwipeAction(itemId, action);
      }
    }
  }

  private _cancelSwipe(itemId: number) {
    const s = this._swipeState.get(itemId);
    if (!s) return;
    this._swipeState.delete(itemId);
    s.innerEl.style.transition = "transform 0.2s ease";
    s.innerEl.style.transform = "translateX(0)";
    const wrap = s.innerEl.closest(".item-row-wrap") as HTMLElement;
    if (wrap) {
      wrap.querySelector(".swipe-bg-right")?.classList.remove("visible");
      wrap.querySelector(".swipe-bg-left")?.classList.remove("visible");
    }
  }

  render() {
    if (!this._config) return nothing;
    const ids = this._configuredIds();
    if (!ids.length) return html`<ha-card><div class="no-data">No items configured</div></ha-card>`;
    if (this._loading) return html`<ha-card><div class="no-data">Loading…</div></ha-card>`;

    const rightMeta = ACTION_META[this._swipeActions.right] ?? ACTION_META.none;
    const leftMeta  = ACTION_META[this._swipeActions.left]  ?? ACTION_META.none;

    return html`
      <ha-card>
        ${this._config.title ? html`<div class="card-header"><h2>${this._config.title}</h2></div>` : nothing}
        <div class="item-list">
          ${ids.map((id) => {
            const item = this._items[id];
            if (!item) return nothing;
            const busy  = !!this._adjusting[id];
            const flash = this._flash[id];
            const meta  = [item.location, item.category].filter(Boolean).join(" · ");
            return html`
              <div class="item-row-wrap">
                ${rightMeta.label ? html`
                  <div class="swipe-bg swipe-bg-right">
                    <span class="icon">${rightMeta.icon}</span>${rightMeta.label}
                  </div>` : nothing}
                ${leftMeta.label ? html`
                  <div class="swipe-bg swipe-bg-left">
                    <span class="icon">${leftMeta.icon}</span>${leftMeta.label}
                  </div>` : nothing}
                <div class="item-row"
                  @pointerdown=${(e: PointerEvent) => this._onPointerDown(e, id)}
                  @pointermove=${(e: PointerEvent) => this._onPointerMove(e, id)}
                  @pointerup=${(e: PointerEvent) => this._onPointerUp(e, id)}
                  @pointercancel=${() => this._cancelSwipe(id)}>
                  <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    ${meta ? html`<div class="item-meta">${meta}</div>` : nothing}
                    ${flash ? html`<div class="flash">${flash}</div>` : nothing}
                  </div>
                  <div class="item-controls">
                    <button class="qty-btn" ?disabled=${busy || item.quantity <= 0}
                      @click=${(e: Event) => { e.stopPropagation(); this._adjust(id, -1); }}>−</button>
                    <div>
                      <div class="qty-display">${item.quantity}</div>
                      ${item.unit ? html`<div class="qty-unit">${item.unit}</div>` : nothing}
                    </div>
                    <button class="qty-btn" ?disabled=${busy}
                      @click=${(e: Event) => { e.stopPropagation(); this._adjust(id, 1); }}>+</button>
                  </div>
                </div>
              </div>`;
          })}
        </div>
        ${this._error ? html`<div class="error-box">${this._error}</div>` : nothing}
        ${this._dialog ? html`
          <div class="dialog-overlay">
            <div class="dialog">
              <h3>Deplete Item</h3>
              <div class="dialog-item">${this._dialog.itemName}</div>
              <div class="dialog-field">
                <label>Reason</label>
                <select @change=${(e: Event) => {
                  if (this._dialog) this._dialog = { ...this._dialog, reason: (e.target as HTMLSelectElement).value };
                }}>
                  ${this._depletionReasons.map((r) => html`
                    <option value=${r} ?selected=${r === this._dialog!.reason}>${r}</option>`)}
                </select>
              </div>
              <div class="dialog-field">
                <label>Date &amp; Time</label>
                <input type="datetime-local" .value=${this._dialog.depleted_at}
                  @input=${(e: Event) => {
                    if (this._dialog) this._dialog = { ...this._dialog, depleted_at: (e.target as HTMLInputElement).value };
                  }} />
              </div>
              <div class="dialog-buttons">
                <button class="btn-confirm" @click=${this._confirmDeplete}>Deplete</button>
                <button class="btn-cancel"  @click=${() => (this._dialog = null)}>Cancel</button>
              </div>
            </div>
          </div>` : nothing}
      </ha-card>
    `;
  }

  static getConfigElement() { return document.createElement("pantrlytics-quick-adjust-card-editor"); }
  static getStubConfig() { return { url: "http://homeassistant.local:8099", item_id_1: 1 }; }
}
