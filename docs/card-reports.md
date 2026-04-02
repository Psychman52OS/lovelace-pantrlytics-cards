# Reports Card

The Reports card shows your inventory health score and a prioritised list of action items — the same data as the Reports page in the app, condensed into a dashboard card.

---

## What it shows

- **Health score** — a number from 0–100 with a letter grade (A–F), displayed as a large badge
- **Breakdown** — three contributing metrics:
  - **Compliance** — percentage of items not past their use-by date
  - **Coverage** — percentage of items that have a use-by date set
  - **Audit** — percentage of items reviewed within their review window
- **Action items** — prioritised list of issues (expired items, no use-by dates, overdue reviews), each with a severity dot:
  - 🔴 Danger — needs immediate attention
  - 🟠 Warning — worth addressing soon
  - 🔵 Info — informational
- A link at the bottom opens the full Reports page.

---

## Score grades

| Grade | Score range | Background |
|---|---|---|
| A | 90–100 | Green |
| B | 75–89 | Lime |
| C | 60–74 | Amber |
| D | 45–59 | Orange |
| F | 0–44 | Red |

---

## Configuration

```yaml
type: custom:pantrlytics-reports-card
url: http://192.168.1.10:8099
title: Inventory Health     # optional
refresh_interval: 600       # optional — seconds between refresh, default 600
```

| Option | Required | Default | Description |
|---|---|---|---|
| `url` | Yes | — | Base URL of your PantrLytics instance |
| `title` | No | `Inventory Health` | Card header text |
| `refresh_interval` | No | `600` | Refresh interval in seconds |

---

## Visual editor

All options are available in the visual editor.

---

## Tips

- The default 600-second (10 minute) refresh is appropriate since health scores change slowly.
- A score below 70 (C or lower) usually means items are missing use-by dates — set **Coverage** as your first focus.
- Use the action items list as a daily checklist — work from top (danger) to bottom (info).
