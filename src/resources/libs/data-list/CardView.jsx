import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import FeaturedImageCell from "./components/FeaturedImageCell";

/**
 * CardView Component
 *
 * Displays items in a card grid layout.
 * Cards are always clickable with fallback chain:
 * 1. onCardClickCallback - Custom card click handler
 * 2. onEdit - Edit callback (opens modal, etc.)
 * 3. editUrl - Navigate to edit URL
 *
 * Shows only excerpt as description - ignores columns/metaColumns props.
 *
 * @param {Array} items - Items to display
 * @param {string} plural - Plural label for empty state
 * @param {string} editUrl - URL for edit navigation (fallback)
 * @param {function} onEdit - Callback for edit action (fallback)
 * @param {function} onCardClickCallback - Custom callback when card is clicked (priority)
 * @param {number} cardsPerRow - Number of cards per row (1-6, default uses responsive grid)
 * @param {Array} allowedActions - Allowed actions: edit, trash, restore, delete
 * @param {Array} customActions - Custom action buttons
 * @param {function} onTrash - Trash callback
 * @param {function} onRestore - Restore callback
 * @param {function} onDelete - Delete callback
 * @param {function} onRefresh - Refresh callback
 * @param {boolean} isFeaturedImage - Show featured image
 * @param {string} restUrl - REST API base URL
 * @param {string} nonce - WordPress nonce
 */
const CardView = ({
  items,
  plural,
  editUrl,
  onEdit,
  onCardClickCallback,
  cardsPerRow,
  allowedActions = [],
  customActions = [],
  onTrash,
  onRestore,
  onDelete,
  onRefresh,
  isFeaturedImage,
  restUrl,
  nonce,
}) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openMenuId &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  /**
   * Toggle dropdown menu
   */
  const handleMenuToggle = useCallback((e, itemId) => {
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === itemId ? null : itemId));
  }, []);

  /**
   * Format date for display
   */
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  /**
   * Get item description from excerpt or content
   */
  const getDescription = useCallback((item) => {
    // Check for excerpt first (Projects, Folders, etc.)
    if (item.excerpt) {
      const excerptText =
        typeof item.excerpt === "string"
          ? item.excerpt
          : item.excerpt?.rendered || item.excerpt?.raw || "";
      const cleanText = excerptText.replace(/<[^>]*>/g, "").trim();
      if (cleanText) return cleanText;
    }

    // Fallback to content
    if (item.content?.rendered) {
      const cleanText = item.content.rendered.replace(/<[^>]*>/g, "").trim();
      if (cleanText) return cleanText;
    }

    return null;
  }, []);

  /**
   * Get item title
   */
  const getTitle = useCallback((item) => {
    if (typeof item.title === "string") return item.title;
    return item.title?.rendered || __("(no title)", "arraysubscription");
  }, []);

  /**
   * Handle action button click
   */
  const handleAction = useCallback(
    async (action, itemId, item) => {
      setOpenMenuId(null);

      switch (action) {
        case "edit":
          if (onEdit) {
            onEdit(item);
          }
          break;
        case "trash":
          await onTrash?.(itemId);
          break;
        case "restore":
          await onRestore?.(itemId);
          break;
        case "delete":
          await onDelete?.(itemId);
          break;
        default:
          // Handle custom actions
          const customAction = customActions.find((a) => a.name === action);
          if (customAction?.callback) {
            await customAction.callback(itemId, item);
            onRefresh?.();
          }
      }
    },
    [onEdit, onTrash, onRestore, onDelete, customActions, onRefresh]
  );

  /**
   * Handle card click - fallback chain: onCardClickCallback → onEdit → editUrl
   */
  const handleCardClick = useCallback(
    (e, item) => {
      // Don't trigger if clicking on interactive elements
      if (
        e.target.closest(".arraysubscription-dl-card-actions") ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        return;
      }

      // Priority: onCardClickCallback → onEdit → editUrl
      if (onCardClickCallback) {
        onCardClickCallback(item);
      } else if (onEdit) {
        onEdit(item);
      } else if (editUrl) {
        navigate(`${editUrl}/${item.id}`);
      }
    },
    [onCardClickCallback, onEdit, editUrl, navigate]
  );

  // Empty state
  if (items.length === 0) {
    return (
      <div className="arraysubscription-dl-empty-state">
        <p>
          {__("No", "arraysubscription")} {plural.toLowerCase()}{" "}
          {__("found.", "arraysubscription")}
        </p>
      </div>
    );
  }

  // Grid style based on cardsPerRow prop
  const gridStyle = cardsPerRow
    ? { gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }
    : undefined;

  return (
    <div className="arraysubscription-dl-card-grid" style={gridStyle}>
      {items.map((item) => {
        const title = getTitle(item);
        const description = getDescription(item);
        const isTrash = item.status === "trash";
        const isDraft = item.status === "draft";
        const isMenuOpen = openMenuId === item.id;

        return (
          <div
            key={item.id}
            className="arraysubscription-dl-card arraysubscription-dl-card--clickable"
            onClick={(e) => handleCardClick(e, item)}
          >
            {/* Featured Image - Left Side */}
            {isFeaturedImage && (
              <div className="arraysubscription-dl-card-thumbnail">
                <FeaturedImageCell
                  value={item.featured_media}
                  restUrl={restUrl}
                  nonce={nonce}
                />
              </div>
            )}

            {/* Content - Right Side */}
            <div className="arraysubscription-dl-card-content">
              {/* Title Row with Status */}
              <div className="arraysubscription-dl-card-title-row">
                <h3 className="arraysubscription-dl-card-title">
                  {editUrl && !onEdit ? (
                    <Link to={`${editUrl}/${item.id}`}>{title}</Link>
                  ) : (
                    <span>{title}</span>
                  )}
                </h3>
                {isDraft && (
                  <span className="arraysubscription-dl-card-status arraysubscription-dl-card-status--draft">
                    {__("Draft", "arraysubscription")}
                  </span>
                )}
                {isTrash && (
                  <span className="arraysubscription-dl-card-status arraysubscription-dl-card-status--trash">
                    {__("Trash", "arraysubscription")}
                  </span>
                )}
              </div>

              {/* Date */}
              <div className="arraysubscription-dl-card-date">
                {formatDate(item.date)}
              </div>

              {/* Description */}
              {description && (
                <div className="arraysubscription-dl-card-description">
                  {description}
                </div>
              )}
            </div>

            {/* Actions Menu - Top Right */}
            <div
              className="arraysubscription-dl-card-actions"
              ref={isMenuOpen ? menuRef : null}
            >
              <button
                className="arraysubscription-dl-card-menu-button"
                onClick={(e) => handleMenuToggle(e, item.id)}
                aria-label={__("More actions", "arraysubscription")}
                aria-expanded={isMenuOpen}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle cx="8" cy="3" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="8" cy="13" r="1.5" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="arraysubscription-dl-card-menu">
                  {/* Edit Action */}
                  {!isTrash &&
                    allowedActions.includes("edit") &&
                    (onEdit ? (
                      <button
                        className="arraysubscription-dl-card-menu-item"
                        onClick={() => handleAction("edit", item.id, item)}
                      >
                        {__("Edit", "arraysubscription")}
                      </button>
                    ) : editUrl ? (
                      <Link
                        to={`${editUrl}/${item.id}`}
                        className="arraysubscription-dl-card-menu-item"
                      >
                        {__("Edit", "arraysubscription")}
                      </Link>
                    ) : null)}

                  {/* Trash Action */}
                  {!isTrash && allowedActions.includes("trash") && (
                    <button
                      className="arraysubscription-dl-card-menu-item"
                      onClick={() => handleAction("trash", item.id)}
                    >
                      {__("Trash", "arraysubscription")}
                    </button>
                  )}

                  {/* Restore Action */}
                  {isTrash && allowedActions.includes("restore") && (
                    <button
                      className="arraysubscription-dl-card-menu-item"
                      onClick={() => handleAction("restore", item.id)}
                    >
                      {__("Restore", "arraysubscription")}
                    </button>
                  )}

                  {/* Delete Action */}
                  {isTrash && allowedActions.includes("delete") && (
                    <button
                      className="arraysubscription-dl-card-menu-item arraysubscription-dl-card-menu-item--danger"
                      onClick={() => handleAction("delete", item.id)}
                    >
                      {__("Delete Permanently", "arraysubscription")}
                    </button>
                  )}

                  {/* Custom Actions */}
                  {customActions.map((action) => (
                    <button
                      key={action.name}
                      className="arraysubscription-dl-card-menu-item"
                      onClick={() => handleAction(action.name, item.id, item)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardView;
