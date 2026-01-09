import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({
  plural,
  singular,
  addUrl,
  onAddNew,
  customButtons = [],
  bulkAction,
  selectedItems,
  allowedActions,
  search,
  onBulkActionChange,
  onBulkActionApply,
  onSearchChange,
  statusList,
  statusFilter,
  statusCounts,
  totalItems,
  dataSource = "post_type",
  onStatusChange,
}) => {
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchChange(searchInput.trim());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Clear search filter when input is empty
    if (value.trim() === "") {
      onSearchChange("");
    }
  };

  return (
    <div className="arraysubscription-dl-header">
      <div className="arraysubscription-dl-toolbar-left">
        <div className="arraysubscription-dl-actions-group">
          <select
            value={bulkAction}
            onChange={(e) => onBulkActionChange(e.target.value)}
          >
            <option value="">Bulk actions</option>
            {allowedActions.includes("trash") && (
              <option value="trash">Trash</option>
            )}
            {allowedActions.includes("delete") && (
              <option value="delete">Delete Permanently</option>
            )}
          </select>
          <button
            onClick={onBulkActionApply}
            disabled={!bulkAction || selectedItems.length === 0}
            className="button"
          >
            Apply
          </button>
        </div>

        <div className="arraysubscription-dl-search-group">
          <input
            type="search"
            placeholder={`Search ${plural.toLowerCase()}...`}
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        {addUrl && (
          <Link
            to={addUrl}
            className="button button-primary arraysubscription-dl-add-new-btn"
          >
            Add New {singular}
          </Link>
        )}
        {!addUrl && onAddNew && (
          <button
            type="button"
            onClick={onAddNew}
            className="button button-primary arraysubscription-dl-add-new-btn"
          >
            Add New {singular}
          </button>
        )}

        {/* Custom action buttons */}
        {customButtons.length > 0 &&
          customButtons.map((btn, index) => (
            <button
              key={index}
              type="button"
              onClick={btn.onClick}
              className={`button ${
                btn.className || "button-secondary"
              } arraysubscription-dl-custom-btn`}
              style={{ marginLeft: "8px", ...btn.style }}
            >
              {btn.label}
            </button>
          ))}
      </div>
      <div className="arraysubscription-dl-toolbar-right">
        {statusList.length > 0 && (
          <div className="arraysubscription-dl-status-tabs">
            {statusList.map(({ status, label }) => (
              <button
                key={status}
                className={`${
                  statusFilter === status ? "arraysubscription-dl-active" : ""
                } arraysubscription-dl-status-tab-item`}
                onClick={() => onStatusChange(status)}
              >
                {label}
                <span className="arraysubscription-dl-count">
                  (
                  {dataSource === "taxonomy" && status === "all"
                    ? totalItems
                    : statusCounts[status] || 0}
                  )
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
