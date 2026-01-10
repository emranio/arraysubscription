import React, { useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TopHeader from "./TopHeader";
import "@scss/pages/default-page-layout.scss";

/**
 * DefaultPageLayout - Common layout for all mainadmin pages
 *
 * @param {Object} props
 * @param {string} props.title - Page title (used as browser title)
 * @param {string} [props.subtitle] - Subtitle text shown under breadcrumb
 * @param {Array} props.breadcrumb - Breadcrumb items [{ label, path }]
 * @param {React.ReactNode} props.children - Page content
 */
const DefaultPageLayout = ({ title, subtitle, breadcrumb = [], children }) => {
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
            {/* Breadcrumb Navigation */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav
                className="arraysubscription-breadcrumb"
                aria-label={__("Breadcrumb", "arraysubscription")}
              >
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <React.Fragment key={index}>
                      {item.path && !isLast ? (
                        <Link
                          to={item.path}
                          className="arraysubscription-breadcrumb__link"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="arraysubscription-breadcrumb__current">
                          {item.label}
                        </span>
                      )}
                      {!isLast && (
                        <ChevronRight
                          size={16}
                          className="arraysubscription-breadcrumb__separator"
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            )}

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
