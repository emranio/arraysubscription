import { NavLink, useLocation } from "react-router-dom";
import menuItems from "../menu.js";

const TopHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Find current parent menu item based on path
  const currentParent = menuItems.find((item) => {
    if (item.path && currentPath === item.path) return true;
    if (item.children) {
      return item.children.some(
        (child) =>
          currentPath === child.path || currentPath.startsWith(child.path + "/")
      );
    }
    return false;
  });

  // Get child items for current section (only if parent has children)
  const childItems = currentParent?.children || [];

  // Get page title
  const getPageTitle = () => {
    if (currentParent) {
      return currentParent.title;
    }
    return "Array Subscription";
  };

  return (
    <header className="arraysubscription-top-header">
      <h1>{getPageTitle()}</h1>
      {childItems.length > 0 && (
        <nav>
          <ul className="arraysubscription-tabs">
            {childItems.map((item) => (
              <li key={item.id} className="arraysubscription-tab">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `arraysubscription-tab-link ${
                      isActive ? "arraysubscription-tab-link--active" : ""
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default TopHeader;
