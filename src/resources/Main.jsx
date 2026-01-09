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
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import "./scss/main/index.scss";
import Sidebar from "./components/Sidebar.jsx";
import { PageSkeleton } from "@libs/skeleton";

// Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

const TestSettings = lazy(() => import("./pages/Settings/TestSettings.jsx"));

const Help = lazy(() => import("./pages/Help.jsx"));
const TestCPTTable = lazy(() => import("./pages/TestCPTTable.jsx"));
const TestCPTCard = lazy(() => import("./pages/TestCPTCard.jsx"));
const TestCPTForm = lazy(() => import("./pages/TestCPTForm.jsx"));
const TestTaxonomy = lazy(() => import("./pages/TestTaxonomy.jsx"));
const TestTaxonomyForm = lazy(() => import("./pages/TestTaxonomyForm.jsx"));

const MainContent = () => {
  return (
    <div className="arraysubscription-main-layout">
      <Sidebar />
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
