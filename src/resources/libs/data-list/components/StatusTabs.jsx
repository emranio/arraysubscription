import React from "react";

/**
 * StatusTabs Component
 *
 * Displays status filter tabs with counts.
 *
 * @param {Array} statusList - Array of {status, label} objects
 * @param {string} statusFilter - Currently active status filter
 * @param {object} statusCounts - Object with counts per status
 * @param {function} onStatusChange - Callback when status changes
 */
const StatusTabs = ({
  statusList,
  statusFilter,
  statusCounts,
  onStatusChange,
}) => {
  return (
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
            ({statusCounts[status] || 0})
          </span>
        </button>
      ))}
    </div>
  );
};

export default StatusTabs;
