import React, { useEffect } from "react";
import TopHeader from "./TopHeader";
import "@scss/pages/default-page-layout.scss";

/**
 * DefaultPageLayout - Common layout for all mainadmin pages
 *
 * @param {Object} props
 * @param {string} props.title - Page title (used as browser title)
 * @param {string} [props.subtitle] - Subtitle text
 * @param {React.ReactNode} props.children - Page content
 */
const DefaultPageLayout = ({ title, subtitle, children }) => {
  // Set browser page title
  useEffect(() => {
    if (title) {
      const appTitle =
        window?.arraySubscription?.env?.appTitle || "ArraySubscription";
      document.title = `${title} - ${appTitle}`;
    }
  }, [title]);

  return (
    <>
      {/* Top Header with tabs */}
      <TopHeader />
      <main className="arraysubscription-main-content">
        <div className="arraysubscription-default-page-layout">
          {/* Page Header */}
          <div className="arraysubscription-page-header">
            {/* Subtitle */}
            {subtitle && (
              <p className="arraysubscription-page-subtitle">{subtitle}</p>
            )}
          </div>

          {/* Page Content */}
          <div className="arraysubscription-page-content">{children}</div>
        </div>
      </main>
    </>
  );
};

export default DefaultPageLayout;
