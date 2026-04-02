# Expiring Items Card

The Expiring Items card shows a list of items nearing their use-by date, sorted by how soon they expire. Each item is a clickable link that opens its detail page.

---

## What it shows

Each row displays:
- **Item name** — clickable, opens the item detail page in a new tab
- **Location · Category** — contextual metadata
- **Quantity** — shown if greater than 1
- **Days remaining** — color-coded:
  - 🔴 Red — already expired (shown as "Xd ago")
  - 🟠 Orange — expiring within 3 days (shown as "Xd" or "Today")
  - 🟢 Green — expiring in 4+ days

If no items are expiring, the card shows "Nothing expiring soon."

---

## Configuration

```yaml
type: custom:pantrlytics-expiring-card
url: http://192.168.1.10:8099
title: Expiring Soon        # optional
days: 7                     # optional — lookahead window in days, default 7
max_items: 10               # optional — max rows to display, default 10
refresh_interval: 300       # optional — seconds between refresh, default 300
```

| Option | Required | Default | Description |
|---|---|---|---|
| `url` | Yes | — | Base URL of your PantrLytics instance |
| `title` | No | `Expiring Soon` | Card header text |
| `days` | No | `7` | How many days ahead to look for expiring items |
| `max_items` | No | `10` | Maximum number of items to show |
| `refresh_interval` | No | `300` | Refresh interval in seconds |

---

## Visual editor

All options are available in the visual editor — no YAML required.

---

## Tips

- Set `days: 14` or `days: 30` for a wider view if you plan meals in advance.
- Set `max_items: 5` for a compact card on a phone dashboard.
- Items only appear here if they have a **use-by date** set. Make sure to fill that field when adding items.
- Combine with the **Stats** card to see the expiring count at a glance, then use this card to see the details.
