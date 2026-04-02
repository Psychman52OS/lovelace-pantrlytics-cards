# Quick Adjust Card

The Quick Adjust card displays up to 10 pinned inventory items with quantity controls and swipe actions — perfect for items you adjust frequently without opening the full app.

---

## What it shows

Each item row displays:
- **Item name** and location/category metadata
- **+/−** buttons to adjust quantity
- **Current quantity** and unit
- **Swipe overlays** with configurable actions (see below)

---

## Configuration

```yaml
type: custom:pantrlytics-quick-adjust-card
url: http://192.168.1.10:8099
title: Quick Adjust         # optional
item_id_1: 12
item_id_2: 7
item_id_3: 23
# item_id_4 through item_id_10 also supported
```

| Option | Required | Default | Description |
|---|---|---|---|
| `url` | Yes | — | Base URL of your PantrLytics instance |
| `title` | No | `Quick Adjust` | Card header text |
| `item_id_1` … `item_id_10` | At least one | — | Item IDs to display (up to 10) |

---

## Finding item IDs

Open any item in the PantrLytics app — the ID is the number in the URL:
```
http://192.168.1.10:8099/item/12
                                ↑ this is the item ID
```

---

## Quantity adjustment

- Tap **+** to increase quantity by 1
- Tap **−** to decrease quantity by 1 (disabled at 0)
- A brief flash message confirms each adjustment
- If an item is already depleted, a message will say so

---

## Swipe actions

Each item row supports left and right swipe gestures. The actions mirror what you have configured in **Admin → Swipe actions** in the PantrLytics app.

Available actions:
| Action | What it does |
|---|---|
| **Edit** | Opens the item edit page in a new tab |
| **Deplete** | Opens a deplete dialog (see below) |
| **Open** | Opens the item detail page in a new tab |
| **Print** | Opens the print page in a new tab |
| **None** | No action |

To change swipe actions, go to the **Admin** page in the PantrLytics app → **Swipe actions** section.

---

## Deplete dialog

When a swipe action triggers **Deplete**, a dialog appears on the card with:
- **Item name** (read-only)
- **Reason** — dropdown of depletion reasons from your app settings
- **Date/time** — defaults to right now, but you can adjust it

Tap **Confirm** to mark the item as depleted. The quantity updates to 0 and a confirmation message appears. Tap **Cancel** to dismiss without any change.

---

## Visual editor

The visual editor has an expandable **Items** section with numbered slots for up to 10 item IDs — no YAML required.

---

## Tips

- Pin the items you use most often — things you top up daily (milk, eggs, coffee, etc.).
- Use a second Quick Adjust card on a mobile dashboard with a shorter list of 3–4 items.
- Swipe right to edit and swipe left to deplete is the default — a natural "done with this" gesture.
- Items that are depleted (quantity = 0) stay visible so you can recover or re-add them.
