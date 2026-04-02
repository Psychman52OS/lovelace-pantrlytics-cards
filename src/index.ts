import "./pantrlytics-reports-card";
import "./pantrlytics-stats-card";
import "./pantrlytics-expiring-card";
import "./pantrlytics-quick-add-card";
import "./pantrlytics-quick-adjust-card";
import "./pantrlytics-status-card";
import "./pantrlytics-editors";

// Register cards in the HA custom card registry
(window as unknown as Record<string, unknown>)["customCards"] ??= [];
((window as unknown as Record<string, unknown[]>)["customCards"]).push(
  {
    type: "pantrlytics-reports-card",
    name: "PantrLytics Reports",
    description: "Inventory health score and action items",
    preview: false,
    configurable: true,
  },
  {
    type: "pantrlytics-stats-card",
    name: "PantrLytics Stats",
    description: "Quick inventory statistics",
    preview: false,
    configurable: true,
  },
  {
    type: "pantrlytics-expiring-card",
    name: "PantrLytics Expiring Items",
    description: "Items nearing their use-by date",
    preview: false,
    configurable: true,
  },
  {
    type: "pantrlytics-quick-add-card",
    name: "PantrLytics Quick Add",
    description: "Add a new item to inventory",
    preview: false,
    configurable: true,
  },
  {
    type: "pantrlytics-quick-adjust-card",
    name: "PantrLytics Quick Adjust",
    description: "Adjust quantity for a single item",
    preview: false,
    configurable: true,
  },
  {
    type: "pantrlytics-status-card",
    name: "PantrLytics Status",
    description: "App health: IPP connectivity, storage breakdown, item counts",
    preview: false,
    configurable: true,
  }
);
