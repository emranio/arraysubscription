// Set webpack public path at runtime for chunk loading
// This MUST be the very first thing before any imports
if (
  window.arraySubscription !== undefined &&
  window.arraySubscription.publicPath
) {
  __webpack_public_path__ = window.arraySubscription.publicPath;
}
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { __ } from "@wordpress/i18n";
import "./scss/main/index.scss";
import { PageSkeleton } from "@libs/skeleton";

// Get menu items from PHP
const menuItems = window.arraySubscriptionMenu?.items || [];

// Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

const TestSettings = lazy(() => import("./pages/Settings/TestSettings.jsx"));

const Help = lazy(() => import("./pages/Help.jsx"));
const TestCPTTable = lazy(() => import("./pages/TestCPTTable.jsx"));
const TestCPTCard = lazy(() => import("./pages/TestCPTCard.jsx"));
const TestCPTForm = lazy(() => import("./pages/TestCPTForm.jsx"));
const TestTaxonomy = lazy(() => import("./pages/TestTaxonomy.jsx"));
const TestTaxonomyForm = lazy(() => import("./pages/TestTaxonomyForm.jsx"));

// Top Header with tabs for child menu items
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
    return __("Array Subscription", "arraysubscription");
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

const MainContent = () => {
  return (
    <div className="arraysubscription-main-layout">
      <TopHeader />
      <main className="arraysubscription-main-content">
        <Suspense fallback={<PageSkeleton hasHeader={true} cards={3} />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/settings/test" element={<TestSettings />} />
            <Route path="/test-cpt/table" element={<TestCPTTable />} />
            <Route path="/test-cpt/card" element={<TestCPTCard />} />
            <Route path="/test-cpt/form/:id?" element={<TestCPTForm />} />
            <Route path="/test-taxonomy" element={<TestTaxonomy />} />
            <Route
              path="/test-taxonomy/form/:id?"
              element={<TestTaxonomyForm />}
            />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

// Get or create the target element
const rootElementId =
  window?.arraySubscription?.env?.mainRootDomId ||
  "arraysubscription-main-root";

let targetElement = document.getElementById(rootElementId);

if (targetElement) {
  // Create React root
  const root = ReactDOM.createRoot(targetElement);

  root.render(
    <React.StrictMode>
      {window.arraySubscription !== undefined ? (
        <Router>
          <MainContent />
        </Router>
      ) : null}
    </React.StrictMode>
  );
} else {
  console.error(
    __(
      "Target element for ArraySubscription app not found.",
      "arraysubscription"
    )
  );
}
