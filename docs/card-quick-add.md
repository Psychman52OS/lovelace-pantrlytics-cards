# Quick Add Card

The Quick Add card lets you add new inventory items directly from your dashboard without opening the full app. You can control exactly which fields are shown to keep the form minimal or detailed.

---

## What it does

- Presents an item entry form on your dashboard
- Submits directly to PantrLytics via the API
- Shows a success message with a link to the new item, then clears the form
- Shows an error message if submission fails

---

## Configuration

```yaml
type: custom:pantrlytics-quick-add-card
url: http://192.168.1.10:8099
title: Add Item             # optional
# Field visibility — all optional, defaults shown:
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

| Option | Required | Default | Description |
|---|---|---|---|
| `url` | Yes | — | Base URL of your PantrLytics instance |
| `title` | No | `Add Item` | Card header text |
| `show_category` | No | `true` | Show category field |
| `show_tags` | No | `false` | Show tags field |
| `show_location` | No | `true` | Show location field |
| `show_bin` | No | `false` | Show bin number field |
| `show_quantity` | No | `true` | Show quantity field |
| `show_unit` | No | `false` | Show unit field |
| `show_condition` | No | `false` | Show condition field |
| `show_origin_date` | No | `false` | Show origin date + label fields |
| `show_use_by_date` | No | `true` | Show use-by date field |
| `show_use_within` | No | `true` | Show "use within" dropdown |
| `show_review_window` | No | `false` | Show per-item review window field |
| `show_notes` | No | `true` | Show notes field |

**Note:** The **Name** field is always shown and always required.

---

## Fields explained

| Field | Description |
|---|---|
| **Name** | Item name — required |
| **Category** | Dropdown with autocomplete from your app's category list |
| **Tags** | Comma-separated tags for searching |
| **Location** | Where the item is stored (fridge, pantry, freezer, etc.) |
| **Bin #** | Shelf or bin label within the location |
| **Quantity** | Numeric count (default 1) |
| **Unit** | Unit of measure (each, bag, oz, etc.) |
| **Condition** | Opened, sealed, etc. |
| **Origin Date** | When the item was made, cooked, purchased, etc. The label (e.g. "Cooked On") is a dropdown populated from your app settings |
| **Use-by Date** | Expiry or best-before date |
| **Use Within** | A relative time window (e.g. "7 Days") — from your app's Use Within list |
| **Review Window** | Per-item override for how often this item needs reviewing (in days) |
| **Notes** | Free-text notes |

---

## Visual editor

The visual editor has an expandable **Fields to show** section with toggles for every field — no YAML required.

---

## Tips

- For a quick intake card (e.g. putting away groceries), show only Name, Location, Use-by Date, and Quantity.
- For a meal-prep card, add Origin Date to record when food was cooked.
- Category and Location fields support autocomplete — they pull from your existing app data.
- After a successful add, click the link in the success message to review or print a label for the new item.
