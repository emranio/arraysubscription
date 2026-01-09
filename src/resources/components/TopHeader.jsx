import { NavLink, useLocation } from "react-router-dom";
import menuItems from "../menu.js";

const TopHeader = () => {
  const location = useLocation();

  // Flatten menu items to get all navigable items
  const flattenMenuItems = (items) => {
    const result = [];
    items.forEach((item) => {
      if (item.path) {
        result.push(item);
      }
      if (item.children) {
        result.push(...item.children.filter((child) => child.path));
      }
    });
    return result;
  };

  const allMenuItems = flattenMenuItems(menuItems);

  return (
    <header className="arraysubscription-top-header">
      <h1>Array Subscription</h1>
      <nav>
        <ul className="arraysubscription-tabs">
          {allMenuItems.map((item) => (
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
    </header>
  );
};

export default TopHeader;
