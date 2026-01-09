import React from "react";

const TableHead = ({
  columns,
  columnFormats = {},
  selectedItems,
  items,
  onSelectAll,
  sortBy,
  sortOrder,
  onSort,
}) => {
  // Determine sortable columns from columnFormats or defaults
  const isSortable = (column) => {
    // Title and date are always sortable
    if (column === "title" || column === "date") return true;

    // Check if column has sortable: true in columnFormats
    const formatConfig = columnFormats[column];
    if (
      formatConfig &&
      typeof formatConfig === "object" &&
      formatConfig.sortable
    ) {
      return true;
    }

    return false;
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) {
      return (
        <div className="sorting-indicators">
          <span className="sorting-indicator asc" aria-hidden="true"></span>
          <span className="sorting-indicator desc" aria-hidden="true"></span>
        </div>
      );
    }

    return (
      <div className="sorting-indicators">
        <span
          className={`sorting-indicator asc ${
            sortOrder === "asc" ? "arraysubscription-dl-asc-active" : ""
          }`}
          aria-hidden="true"
        ></span>
        <span
          className={`sorting-indicator desc ${
            sortOrder === "desc" ? "arraysubscription-dl-desc-active" : ""
          }`}
          aria-hidden="true"
        ></span>
      </div>
    );
  };

  const getColumnLabel = (column) => {
    // Check if custom label is provided in columnFormats
    const formatConfig = columnFormats[column];
    if (
      formatConfig &&
      typeof formatConfig === "object" &&
      formatConfig.label
    ) {
      return formatConfig.label;
    }

    // Convert snake_case to Title Case
    return column
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <thead>
      <tr>
        <th className="checkbox-col">
          <input
            type="checkbox"
            checked={selectedItems.length === items.length && items.length > 0}
            onChange={onSelectAll}
          />
        </th>
        {columns.map((column) => (
          <th
            // width={column === "title" && "28%"}
            key={column}
            className={`${column === "date" ? "date-col" : ""} ${
              isSortable(column) ? "arraysubscription-dl-sortable-head" : ""
            }`}
          >
            {isSortable(column) ? (
              <button
                className="arraysubscription-dl-actions"
                onClick={() => isSortable(column) && onSort(column)}
              >
                {getColumnLabel(column)}
                {getSortIcon(column)}
              </button>
            ) : (
              getColumnLabel(column)
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
