# Installation

## Prerequisites

- [PantrLytics](https://github.com/Psychman52OS/PantrLytics) installed as a Home Assistant add-on (v2026.04.02 or later)
- Home Assistant 2024.1.0 or later
- HACS installed (recommended) or manual file access to your HA config

---

## Install via HACS (recommended)

1. Open **HACS** in Home Assistant.
2. Go to **Frontend** → click the **⋮** menu → **Custom repositories**.
3. Paste `https://github.com/Psychman52OS/lovelace-pantrlytics-cards` and set category to **Dashboard**.
4. Search for **PantrLytics Cards** and click **Download**.
5. Go to **Settings → Dashboards → ⋮ → Manage resources**.
6. Click **Add resource** and enter:
   - URL: `/hacsfiles/lovelace-pantrlytics-cards/pantrlytics-cards.js`
   - Resource type: **JavaScript module**
7. Hard-refresh your browser (`Cmd+Shift+R` / `Ctrl+Shift+R`).

---

## Manual install

1. Download `pantrlytics-cards.js` from the [latest release](https://github.com/Psychman52OS/lovelace-pantrlytics-cards/releases/latest) or directly from the repo root.
2. Copy it to `/config/www/pantrlytics-cards.js` on your HA instance.
3. Go to **Settings → Dashboards → ⋮ → Manage resources**.
4. Click **Add resource**:
   - URL: `/local/pantrlytics-cards.js`
   - Resource type: **JavaScript module**
5. Hard-refresh your browser.

---

## Adding a card to your dashboard

1. Open a dashboard and click **Edit dashboard** (pencil icon).
2. Click **+ Add card**.
3. Scroll down to find any card starting with **PantrLytics**, or search for "pantrlytics".
4. Select a card and configure it using the visual editor or YAML.

All cards require the `url` field pointing to your PantrLytics instance.

---

## Finding your PantrLytics URL

- **HA add-on users:** use `http://<your-ha-ip>:8099` (the port you mapped in the add-on network settings)
- **Standalone Docker users:** use whatever `BASE_URL` you set in your `.env`

The cards automatically resolve the HA ingress path internally — you do not need to use the ingress URL.

---

## Updating via HACS

When a new version is released, HACS will show an update badge under **Frontend**. Click **Update** and then hard-refresh your browser.
