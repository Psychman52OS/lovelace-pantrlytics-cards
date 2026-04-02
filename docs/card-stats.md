# Stats Card

The Stats card gives you an at-a-glance inventory summary on your dashboard with three key numbers.

---

## What it shows

| Metric | Description |
|---|---|
| **Active Items** | Total number of items currently in inventory (not depleted) |
| **Expiring in 7 days** | Items whose use-by date falls within the next 7 days — highlighted in orange when > 0 |
| **Used Today** | Items marked as depleted today |

A link at the bottom opens the full PantrLytics app.

---

## Configuration

```yaml
type: custom:pantrlytics-stats-card
url: http://192.168.1.10:8099
title: PantrLytics          # optional — card header text
refresh_interval: 300       # optional — seconds between auto-refresh, default 300
```

| Option | Required | Default | Description |
|---|---|---|---|
| `url` | Yes | — | Base URL of your PantrLytics instance |
| `title` | No | `PantrLytics` | Card header text |
| `refresh_interval` | No | `300` | How often (seconds) the card refreshes data |

---

## Visual editor

Open the card in the Lovelace editor and click the pencil icon. All options are available as form fields — no YAML required.

---

## Tips

- Place this card near the top of your main dashboard for a quick daily check.
- The expiring count turns orange when any items are expiring soon — useful as a visual alert.
- Pair with the **Expiring Items** card to see which specific items are expiring.
