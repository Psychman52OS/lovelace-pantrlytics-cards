# App Status Card

The App Status card shows the operational health of your PantrLytics instance — printer connectivity, storage usage, and item counts. Useful for a home lab or admin dashboard.

---

## What it shows

| Row | Description |
|---|---|
| **IPP Printer** | Whether the configured IPP printer is reachable, with the host name. Green dot = reachable, grey = not configured, red = unreachable. |
| **App Storage** | Total application storage used. Click to expand a breakdown by component. |
| **Active Items** | How many items are currently active, out of the total (including depleted). |

The card header shows the app name and version number.

---

## Storage breakdown

Clicking the **App Storage** row expands it to show:

| Component | What it measures |
|---|---|
| Database | The SQLite inventory database file |
| Photos | All uploaded item photos |
| Backups | Backup zip files stored on the HA instance |
| Other | Anything else in the app data directory |

---

## Configuration

```yaml
type: custom:pantrlytics-status-card
url: http://192.168.1.10:8099
title: PantrLytics          # optional — shown as app name in header
refresh_interval: 60        # optional — seconds between refresh, default 60
# Row visibility — all optional, all default to true:
show_ipp: true
show_storage: true
show_items: true
```

| Option | Required | Default | Description |
|---|---|---|---|
| `url` | Yes | — | Base URL of your PantrLytics instance |
| `title` | No | `PantrLytics` | App name shown in the card header |
| `refresh_interval` | No | `60` | Refresh interval in seconds |
| `show_ipp` | No | `true` | Show the IPP Printer row |
| `show_storage` | No | `true` | Show the App Storage row |
| `show_items` | No | `true` | Show the Active Items row |

---

## Visual editor

The visual editor has an expandable **Rows to show** section with toggles for each row — no YAML required.

---

## Tips

- The default 60-second refresh keeps printer status current without excessive polling.
- If you don't use a printer, set `show_ipp: false` to hide that row.
- The storage breakdown is useful for monitoring growth over time — if backups are large, consider cleaning old ones from the Backup page in the app.
- Place this card on an admin or home lab dashboard rather than a daily-use dashboard.
