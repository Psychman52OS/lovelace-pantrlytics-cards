import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";

/**
 * Base class for all PantrLytics cards.
 *
 * Resolution order for API base URL:
 *   1. WebSocket supervisor/api — calls hassio/addons/{slug}/info via WS,
 *      which uses the backend Supervisor token and doesn't require the HA
 *      user to be an admin. Returns ingress_entry (/api/hassio_ingress/TOKEN).
 *      Slug is read from hass.panels (config.addon field); falls back to
 *      known slugs local_pantrlytics / pantrlytics.
 *   2. Configured `url` directly — works for standalone Docker use but is
 *      blocked by HA's Content-Security-Policy when running inside the
 *      dashboard (different port = different origin).
 *
 * After the first API fetch, `_resolvedBase` holds the resolved base string
 * (relative ingress path or direct URL). Cards use it to build navigation links.
 */
export class PantrlyticsBase extends LitElement {
  @property({ attribute: false }) public hass: any = null;

  /** Resolved base URL/path — available after first _apiFetch completes. */
  @state() protected _resolvedBase: string | null = null;

  private _basePromise: Promise<{ url: string; useHass: boolean }> | null = null;

  private _resolveBase(
    configUrl: string
  ): Promise<{ url: string; useHass: boolean }> {
    if (this._basePromise) return this._basePromise;
    this._basePromise = (async () => {
      if (this.hass) {
        // Strategy 1: WebSocket supervisor/api
        // Uses the backend Supervisor token — works without admin HTTP auth.
        const slugs = this._slugsFromPanels();
        for (const slug of slugs) {
          try {
            const info = await this.hass.callWS({
              type: "supervisor/api",
              endpoint: `/addons/${slug}/info`,
              method: "get",
              timeout: false,
            });
            const ingressEntry: string | undefined =
              info?.ingress_entry ?? info?.ingress_url;
            if (ingressEntry) {
              // Root-relative path so fetchWithAuth accepts it.
              // For navigation links, prepend window.location.origin.
              return {
                url: ingressEntry.replace(/\/+$/, ""),
                useHass: true,
              };
            }
          } catch {
            // try next slug
          }
        }
      }

      // Strategy 2: direct URL (fallback, blocked by CSP inside HA)
      return { url: configUrl.replace(/\/$/, ""), useHass: false };
    })();
    return this._basePromise;
  }

  /**
   * Read add-on slug(s) from hass.panels — each ingress add-on panel has
   * a config.addon property with its Supervisor slug.
   * Falls back to known PantrLytics slugs if no panel is found.
   */
  private _slugsFromPanels(): string[] {
    const found: string[] = [];
    if (this.hass?.panels) {
      for (const panel of Object.values(this.hass.panels)) {
        const p = panel as any;
        const addon: string = (p.config?.addon ?? "").toLowerCase();
        if (addon.includes("pantrlytics")) {
          found.push(p.config.addon as string);
        }
      }
    }
    return found.length
      ? [...new Set(found)]
      : ["local_pantrlytics", "pantrlytics"];
  }

  /** Call after hass changes if you need to re-resolve the base URL. */
  protected _resetBase(): void {
    this._basePromise = null;
    this._resolvedBase = null;
  }

  protected async _apiFetch(
    configUrl: string,
    path: string,
    init?: RequestInit
  ): Promise<Response> {
    const { url, useHass } = await this._resolveBase(configUrl);
    // Cache for use in navigation links (cards prepend origin for hrefs)
    if (!this._resolvedBase) this._resolvedBase = url;
    const fullUrl = url + path;
    if (useHass && this.hass?.fetchWithAuth) {
      return this.hass.fetchWithAuth(fullUrl, init);
    }
    return fetch(fullUrl, init);
  }

  /**
   * Build a full navigation URL for use in href attributes.
   * When using ingress (root-relative path), prepends the window origin.
   * Falls back to configUrl if base not yet resolved.
   */
  protected _navUrl(configUrl: string, path: string): string {
    const base = this._resolvedBase ?? configUrl.replace(/\/$/, "");
    if (base.startsWith("/")) {
      return window.location.origin + base + path;
    }
    return base + path;
  }
}
