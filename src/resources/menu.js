import { __ } from "@wordpress/i18n";

const menuItems = [
  {
    id: "dashboard",
    title: __("Dashboard", "arraysubscription"),
    path: "/",
  },
  {
    id: "settings",
    title: __("Settings", "arraysubscription"),
    children: [
      {
        id: "ai-things",
        title: __("Test Settings", "arraysubscription"),
        path: "/settings/test",
      },
    ],
  },
  {
    id: "test-cpt",
    title: __("Test CPT", "arraysubscription"),
    children: [
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
    ],
  },
  {
    id: "help",
    title: __("Help", "arraysubscription"),
    path: "/help",
  },
];

export default menuItems;
