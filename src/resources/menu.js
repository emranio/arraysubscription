const menuItems = [
  {
    id: "dashboard",
    title: __("Dashboard", "arraysubscription"),
    path: "/",
  },
  {
    id: "projects",
    title: __("Projects", "arraysubscription"),
    path: "/projects",
  },
  {
    id: "usage-metrics",
    title: __("Usage Metrics", "arraysubscription"),
    children: [
      {
        id: "usage-metrics-overview",
        title: __("Overview", "arraysubscription"),
        path: "/usage-metrics/overview",
      },
      {
        id: "usage-metrics-table",
        title: __("Table", "arraysubscription"),
        path: "/usage-metrics/table",
      },
    ],
  },
  {
    id: "settings",
    title: __("Settings", "arraysubscription"),
    children: [
      {
        id: "ai-things",
        title: __("AI Things", "arraysubscription"),
        path: "/settings/ai-things",
      },
    ],
  },
  {
    id: "help",
    title: __("Help", "arraysubscription"),
    path: "/help",
  },
  {
    id: "test-cpt-card",
    title: __("Test CPT Card", "arraysubscription"),
    path: "/test-cpt/card",
  },

  {
    id: "test-cpt-table",
    title: __("Test CPT Table", "arraysubscription"),
    path: "/test-cpt/table",
  },
  {
    id: "test-taxonomy",
    title: __("Test Taxonomy", "arraysubscription"),
    path: "/test-taxonomy",
  },
];

export default menuItems;
