import { useState, memo, useCallback } from "@wordpress/element";
import { NavLink } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Wrench,
  HelpCircle,
  ChevronDown,
  MoveLeft,
  ChevronRight,
  Icon,
  BarChart3,
  FolderKanban,
} from "lucide-react";

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState([]);

  const toggleMenu = useCallback((menuId) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      title: __("Dashboard", "arraysubscription"),
      path: "/",
      icon: LayoutDashboard,
    },
    {
      id: "projects",
      title: __("Projects", "arraysubscription"),
      path: "/projects",
      icon: FolderKanban,
    },
    {
      id: "usage-metrics",
      title: __("Usage Metrics", "arraysubscription"),
      icon: BarChart3,
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
      icon: Settings,
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
      icon: HelpCircle,
    },
    {
      id: "test-cpt-card",
      title: __("Test CPT Card", "arraysubscription"),
      path: "/test-cpt/card",
      icon: HelpCircle,
    },

    {
      id: "test-cpt-table",
      title: __("Test CPT Table", "arraysubscription"),
      path: "/test-cpt/table",
      icon: HelpCircle,
    },
    {
      id: "test-taxonomy",
      title: __("Test Taxonomy", "arraysubscription"),
      path: "/test-taxonomy",
      icon: HelpCircle,
    },
  ];

  const renderMenuItem = useCallback(
    (item) => {
      const hasChildren = item.children?.length > 0;
      const isExpanded = expandedMenus.includes(item.id);
      const Icon = item.icon;

      if (hasChildren) {
        return (
          <li
            key={item.id}
            className="arraysubscription-sidebar__menu-item arraysubscription-sidebar__menu-item--parent"
          >
            <button
              className="arraysubscription-sidebar__menu-button"
              onClick={() => toggleMenu(item.id)}
              aria-expanded={isExpanded}
            >
              <span className="arraysubscription-sidebar__menu-icon">
                <Icon size={16} strokeWidth={2} />
              </span>
              <span className="arraysubscription-sidebar__menu-text">
                {item.title}
              </span>
              <span className="arraysubscription-sidebar__menu-chevron">
                {isExpanded ? (
                  <ChevronDown size={14} strokeWidth={3} />
                ) : (
                  <ChevronRight size={14} strokeWidth={3} />
                )}
              </span>
            </button>
            {isExpanded && (
              <ul className="arraysubscription-sidebar__submenu">
                {item.children.map((child) => (
                  <li
                    key={child.id}
                    className="arraysubscription-sidebar__submenu-item"
                  >
                    <NavLink
                      to={child.path}
                      className={({ isActive }) =>
                        `arraysubscription-sidebar__submenu-link${
                          isActive
                            ? " arraysubscription-sidebar__submenu-link--active"
                            : ""
                        }`
                      }
                    >
                      {child.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      }

      return (
        <li key={item.id} className="arraysubscription-sidebar__menu-item">
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `arraysubscription-sidebar__menu-link${
                isActive ? " arraysubscription-sidebar__menu-link--active" : ""
              }`
            }
            end={item.path === "/"}
          >
            <span className="arraysubscription-sidebar__menu-icon">
              <Icon size={16} strokeWidth={2} />
            </span>
            <span className="arraysubscription-sidebar__menu-text">
              {item.title}
            </span>
          </NavLink>
        </li>
      );
    },
    [expandedMenus, toggleMenu]
  );

  return (
    <aside className="arraysubscription-sidebar">
      <div className="arraysubscription-sidebar-header">
        <a
          href={window.arraySubscription.env.wpAdminUrl}
          className="arraysubscription-sidebar__back-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -2 24 24"
            width="34"
            height="34"
            className="arraysubscription-sidebar__wp-icon"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z"></path>
          </svg>
          <span>
            <MoveLeft
              size={28}
              strokeWidth={1}
              absoluteStrokeWidth
              className="arrow-icon"
            />
            {__("Return", "arraysubscription")}
          </span>
        </a>
        <div className="arraysubscription-sidebar__welcome">
          <h3>{__("Welcome back, Adam", "arraysubscription")}</h3>
          <p>
            {__(
              "You've had 22 visits to your site since your last login",
              "arraysubscription"
            )}
          </p>
        </div>
      </div>
      <nav className="arraysubscription-sidebar__nav">
        <ul className="arraysubscription-sidebar__menu">
          {menuItems.map(renderMenuItem)}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(Sidebar);
