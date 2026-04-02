# PantrLytics Lovelace Cards

A set of Home Assistant Lovelace cards for [PantrLytics](https://github.com/Psychman52OS/PantrLytics) — an inventory management add-on with label printing.

## Cards

| Card | Description |
|---|---|
| **Stats** | Total active items, expiring count, depleted today |
| **Expiring Items** | List of items nearing use-by date with color-coded days remaining |
| **Reports** | Inventory health score (A–F), compliance breakdown, action items |
| **Quick Add** | Full item entry form with per-field visibility toggles |
| **Quick Adjust** | Up to 10 items with +/− quantity buttons and configurable swipe actions |
| **App Status** | IPP printer status, app storage breakdown, item counts, app version |

---

## Prerequisites

- [PantrLytics](https://github.com/Psychman52OS/PantrLytics) installed as a Home Assistant add-on (v2026.04.02 or later)
- Home Assistant 2024.1.0 or later

---

## Installation via HACS (recommended)

1. Open HACS in Home Assistant.
2. Go to **Frontend** → click the **⋮** menu → **Custom repositories**.
3. Add `https://github.com/Psychman52OS/lovelace-pantrlytics-cards` as category **Lovelace**.
4. Search for **PantrLytics Cards** and click **Download**.
5. Add the resource to your Lovelace configuration:
   - Go to **Settings → Dashboards → ⋮ → Manage resources**.
   - Add `/hacsfiles/lovelace-pantrlytics-cards/pantrlytics-cards.js` as a **JavaScript module**.
6. Reload your browser (`Ctrl+Shift+R` / `Cmd+Shift+R`).

---

## Manual Installation

1. Download `dist/pantrlytics-cards.js` from the [latest release](https://github.com/Psychman52OS/lovelace-pantrlytics-cards/releases/latest) (or from this repo directly).
2. Copy it to `/config/www/pantrlytics-cards.js` on your Home Assistant instance.
3. Add the resource to Lovelace:
   - **Settings → Dashboards → ⋮ → Manage resources**
   - Add `/local/pantrlytics-cards.js` as a **JavaScript module**.
4. Reload your browser.

---

## Configuration

All cards require a `url` pointing to your PantrLytics instance.

**If using HA ingress (recommended):** Set `url` to `http://homeassistant.local:8099` — the cards automatically resolve the ingress path internally.

**If running standalone Docker:** Set `url` to the direct IP:port, e.g. `http://192.168.1.10:8099`.

---

### Stats Card

```yaml
type: custom:pantrlytics-stats-card
url: http://homeassistant.local:8099
title: PantrLytics          # optional
refresh_interval: 300       # seconds, default 300
```

### Expiring Items Card

```yaml
type: custom:pantrlytics-expiring-card
url: http://homeassistant.local:8099
title: Expiring Soon        # optional
days: 7                     # lookahead days, default 7
max_items: 10               # max rows to show, default 10
refresh_interval: 300       # seconds, default 300
```

### Reports Card

```yaml
type: custom:pantrlytics-reports-card
url: http://homeassistant.local:8099
title: Inventory Health     # optional
refresh_interval: 600       # seconds, default 600
```

### Quick Add Card

```yaml
type: custom:pantrlytics-quick-add-card
url: http://homeassistant.local:8099
title: Add Item             # optional
# Field visibility (all optional — defaults shown):
show_category: true
show_tags: false
show_location: true
show_bin: false
show_quantity: true
show_unit: false
show_condition: false
show_origin_date: false
show_use_by_date: true
show_use_within: true
show_review_window: false
show_notes: true
```

### Quick Adjust Card

```yaml
type: custom:pantrlytics-quick-adjust-card
url: http://homeassistant.local:8099
title: Quick Adjust         # optional
item_id_1: 12               # item IDs from your PantrLytics instance
item_id_2: 7
item_id_3: 23
# item_id_4 through item_id_10 also supported
```

Swipe actions (left/right) mirror what is configured in **Admin → Swipe actions** in the PantrLytics app.

To find an item's ID: open the item detail page — the ID is in the URL (`/item/12`).

### App Status Card

```yaml
type: custom:pantrlytics-status-card
url: http://homeassistant.local:8099
title: PantrLytics          # optional — shown as app name header
refresh_interval: 60        # seconds, default 60
# Row visibility (all optional — all default to true):
show_ipp: true
show_storage: true
show_items: true
```

---

## Visual Editor

All cards support the Home Assistant visual editor. Open any card in the Lovelace UI editor and click the pencil icon to configure options without writing YAML.

---

## Development

```bash
git clone https://github.com/Psychman52OS/lovelace-pantrlytics-cards
cd lovelace-pantrlytics-cards
npm install
npm run build        # outputs dist/pantrlytics-cards.js
npm run watch        # rebuild on file changes
```

To deploy directly to a Home Assistant instance, use the `sync-to-ha.sh` script in the main PantrLytics repo.
