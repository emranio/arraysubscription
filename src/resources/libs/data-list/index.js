import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import TableView from "./TableView";
import Pagination from "./components/Pagination";
import MediaGalleryCell from "./components/MediaGalleryCell";
import { buildUrl } from "../url";
import "./scss/data-list.scss";

const DataList = ({
  cptSlug,
  addUrl,
  editUrl,
  onAddNew,
  onEdit,
  onDeleteWarnMsg,
  customButtons = [],
  viewExtraProps = {},
  labels = {},
  statusList = [
    { status: "all", label: "All" },
    { status: "publish", label: "Publish" },
    { status: "draft", label: "Draft" },
    { status: "trash", label: "Trash" },
  ],
  allowedActions = ["edit", "trash", "restore", "delete"],
  perPage = 10,
  restUrl,
  nonce,
  columns = ["date"],
  metaColumns = [],
  columnFormats = {},
  customActions = [],
  isFeaturedImage,
  viewComponent,
  dataSource = "post_type", // 'post_type' or 'taxonomy'
  transformData, // Optional function to transform fetched data
  queryParams = {}, // Additional query parameters for API requests
  statusFiltering = true, // Whether to add status filtering to queries
}) => {
  // Validate required props
  if (!restUrl) {
    throw new Error("DataList: 'restUrl' prop is required");
  }
  if (!nonce) {
    throw new Error("DataList: 'nonce' prop is required");
  }

  // Validate dataSource
  if (!["post_type", "taxonomy"].includes(dataSource)) {
    throw new Error(
      "DataList: 'dataSource' must be either 'post_type' or 'taxonomy'"
    );
  }

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    publish: 0,
    draft: 0,
    trash: 0,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [sortBy, setSortBy] = useState(
    dataSource === "taxonomy" ? "name" : "date"
  );
  const [sortOrder, setSortOrder] = useState("desc");
  const searchTimeoutRef = useRef(null);

  const { singular = "Item", plural = "Items" } = labels;

  // Build full columns array with title first and date last (or without date for taxonomies)
  const columnsWithoutDate = [...columns, ...metaColumns].filter(
    (col) => col !== "date"
  );
  const allColumns =
    dataSource === "taxonomy"
      ? ["title", ...columnsWithoutDate]
      : ["title", ...columnsWithoutDate, "date"];

  const fetchItems = async (page = 1, searchTerm = "", status = "all") => {
    setLoading(true);
    try {
      // Prepare query parameters
      const params = {
        per_page: perPage,
        page: page,
        ...queryParams, // Include additional custom query params
      };

      if (searchTerm) {
        params.search = searchTerm;
      }

      // Status handling differs for post_type vs taxonomy
      // Only add status filtering if statusFiltering is enabled
      if (dataSource === "post_type" && statusFiltering) {
        if (status !== "all") {
          params.status = status;
        } else {
          params.status = ["publish", "draft"];
        }
      }

      // Add sorting parameters
      if (sortBy === "title") {
        params.orderby = dataSource === "taxonomy" ? "name" : "title";
        params.order = sortOrder;
      } else if (sortBy === "date") {
        // Taxonomies don't support date ordering
        if (dataSource === "post_type") {
          params.orderby = "date";
          params.order = sortOrder;
        }
      } else if (metaColumns.includes(sortBy)) {
        // Meta field sorting - check if numeric
        const formatConfig = columnFormats[sortBy];
        const type =
          typeof formatConfig === "object" ? formatConfig.type : formatConfig;
        const orderbyType = type === "number" ? "meta_value_num" : "meta_value";
        params.orderby = orderbyType;
        params.meta_key = sortBy;
        params.order = sortOrder;
      }

      // Build the endpoint URL based on dataSource
      const endpoint =
        dataSource === "taxonomy"
          ? `${restUrl}wp/v2/${cptSlug}`
          : `${restUrl}wp/v2/${cptSlug}`;

      const url = buildUrl(endpoint, params);

      const response = await fetch(url, {
        headers: {
          "X-WP-Nonce": nonce,
        },
      });

      // Get headers BEFORE consuming the response body
      const total = response.headers.get("X-WP-Total");
      const totalPagesHeader = response.headers.get("X-WP-TotalPages");

      console.log(
        "Total from header:",
        total,
        "Total pages:",
        totalPagesHeader
      );

      const data = await response.json();

      // Apply transformData function if provided
      const transformedData =
        transformData && Array.isArray(data) ? transformData(data) : data;

      setItems(Array.isArray(transformedData) ? transformedData : []);
      setTotalItems(parseInt(total) || 0);
      setTotalPages(parseInt(totalPagesHeader) || 1);
    } catch (error) {
      console.error(`Error fetching ${plural.toLowerCase()}:`, error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch status counts
  const fetchStatusCounts = async () => {
    // Taxonomies don't have status counts
    if (dataSource === "taxonomy") {
      return;
    }

    try {
      const url = buildUrl(
        `${restUrl}arraysubscription/v1/status-counts/${cptSlug}`
      );
      const response = await fetch(url, {
        headers: {
          "X-WP-Nonce": nonce,
        },
      });
      const data = await response.json();
      setStatusCounts(data);
    } catch (error) {
      console.error(`Error fetching status counts:`, error);
    }
  };

  // Fetch items when filters/pagination/sort change
  useEffect(() => {
    fetchItems(currentPage, search, statusFilter);
  }, [currentPage, search, statusFilter, sortBy, sortOrder]);

  // Debounced search: trigger fetch after 500ms of no typing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  // Fetch status counts only on mount
  useEffect(() => {
    fetchStatusCounts();
  }, []);

  const handleDelete = async (id, item) => {
    // Generate delete warning message
    const warningMessage = onDeleteWarnMsg
      ? typeof onDeleteWarnMsg === "function"
        ? onDeleteWarnMsg(item)
        : onDeleteWarnMsg
      : `Are you sure you want to delete this ${singular.toLowerCase()} permanently?`;

    if (!confirm(warningMessage)) {
      return;
    }

    try {
      const url = buildUrl(`${restUrl}wp/v2/${cptSlug}/${id}`, { force: true });
      await fetch(url, {
        method: "DELETE",
        headers: {
          "X-WP-Nonce": nonce,
        },
      });
      fetchItems(currentPage, search, statusFilter);
      if (dataSource === "post_type") {
        fetchStatusCounts();
      }
    } catch (error) {
      console.error(`Error deleting ${singular.toLowerCase()}:`, error);
      alert(`Failed to delete ${singular.toLowerCase()}`);
    }
  };

  const handleTrash = async (id, item) => {
    // Taxonomies don't have trash functionality
    if (dataSource === "taxonomy") {
      return handleDelete(id, item);
    }

    try {
      const url = buildUrl(`${restUrl}wp/v2/${cptSlug}/${id}`);
      await fetch(url, {
        method: "DELETE",
        headers: {
          "X-WP-Nonce": nonce,
        },
      });
      fetchItems(currentPage, search, statusFilter);
      fetchStatusCounts();
    } catch (error) {
      console.error(`Error trashing ${singular.toLowerCase()}:`, error);
      alert(`Failed to trash ${singular.toLowerCase()}`);
    }
  };

  const handleRestore = async (id) => {
    // Taxonomies don't have restore functionality
    if (dataSource === "taxonomy") {
      return;
    }

    try {
      const url = buildUrl(`${restUrl}wp/v2/${cptSlug}/${id}`);
      await fetch(url, {
        method: "POST",
        headers: {
          "X-WP-Nonce": nonce,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "publish" }),
      });
      fetchItems(currentPage, search, statusFilter);
      fetchStatusCounts();
    } catch (error) {
      console.error(`Error restoring ${singular.toLowerCase()}:`, error);
      alert(`Failed to restore ${singular.toLowerCase()}`);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedItems.length === 0) return;

    const confirmed = confirm(
      `Are you sure you want to ${bulkAction} ${selectedItems.length} item(s)?`
    );
    if (!confirmed) return;

    try {
      for (const id of selectedItems) {
        let url;
        if (bulkAction === "trash") {
          url = buildUrl(`${restUrl}wp/v2/${cptSlug}/${id}`);
          await fetch(url, {
            method: "DELETE",
            headers: { "X-WP-Nonce": nonce },
          });
        } else if (bulkAction === "delete") {
          url = buildUrl(`${restUrl}wp/v2/${cptSlug}/${id}`, { force: true });
          await fetch(url, {
            method: "DELETE",
            headers: { "X-WP-Nonce": nonce },
          });
        }
      }
      setSelectedItems([]);
      setBulkAction("");
      fetchItems(currentPage, search, statusFilter);
      fetchStatusCounts();
    } catch (error) {
      console.error("Error performing bulk action:", error);
      alert("Error performing bulk action");
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle sort order if clicking same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // New column, default to desc
      setSortBy(column);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchItems(currentPage, search, statusFilter);
    fetchStatusCounts();
  };

  const formatColumnValue = (value, formatConfig) => {
    if (!formatConfig) return value || "-";

    // Handle both old format (string) and new format (object)
    const type =
      typeof formatConfig === "string" ? formatConfig : formatConfig.type;
    const config = typeof formatConfig === "object" ? formatConfig : {};

    switch (type) {
      case "string":
        return value || "-";
      case "number":
        return typeof value === "number" ? value.toLocaleString() : value || 0;
      case "bool":
        const texts = config.texts || { true: "Yes", false: "No" };
        const boolValue = value === true || value === "true" || value === 1;
        return texts[boolValue] || texts.false;
      case "tag":
        // Handle array of values for multiple tags
        if (Array.isArray(value)) {
          return (
            <div className="arraysubscription-dl-tags">
              {value.map((val, idx) => {
                const tagClass = getTagClassName(val);
                return (
                  <span
                    key={idx}
                    className={`arraysubscription-dl-tag ${tagClass}`}
                  >
                    {val ? val.charAt(0).toUpperCase() + val.slice(1) : "-"}
                  </span>
                );
              })}
            </div>
          );
        }
        // Single tag
        const tagClass = getTagClassName(value);
        return (
          <span className={`arraysubscription-dl-tag ${tagClass}`}>
            {value ? value.charAt(0).toUpperCase() + value.slice(1) : "-"}
          </span>
        );
      case "media_gallery":
        // Handle media gallery - value should be media objects array
        if (!value || !Array.isArray(value) || value.length === 0) {
          return <span className="arraysubscription-dl-empty">No images</span>;
        }
        return (
          <div className="arraysubscription-dl-media-gallery">
            {value.slice(0, 3).map((media, idx) => (
              <img
                key={idx}
                src={media.thumbnail || media.url}
                alt={media.alt || "Media"}
                className="arraysubscription-dl-media-gallery__thumbnail"
              />
            ))}
            {value.length > 3 && (
              <span className="arraysubscription-dl-media-gallery__count">
                +{value.length - 3}
              </span>
            )}
          </div>
        );
      default:
        return value || "-";
    }
  };

  const getTagClassName = (value) => {
    const tagClasses = {
      publish: "arraysubscription-dl-tag--publish",
      draft: "arraysubscription-dl-tag--draft",
      trash: "arraysubscription-dl-tag--trash",
      pending: "arraysubscription-dl-tag--pending",
    };
    return tagClasses[value] || "arraysubscription-dl-tag--default";
  };

  const renderColumnValue = (item, column) => {
    // Handle title column in TableBody
    if (column === "title") {
      return null;
    }

    // Handle date column - taxonomies don't have date field
    if (column === "date") {
      if (dataSource === "taxonomy") {
        return "-";
      }
      const dateObj = new Date(item.date);
      const formattedDate = dateObj
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .join("/");
      const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const statusLabel =
        item.status === "publish" ? "Published" : "Last Modified";
      return (
        <div className="arraysubscription-dl-date">
          <div className="arraysubscription-dl-date__label">{statusLabel}</div>
          <div className="arraysubscription-dl-date__value">
            {formattedDate} at {formattedTime}
          </div>
        </div>
      );
    }

    // Handle count column for taxonomies (check before metaColumns)
    if (column === "count" && dataSource === "taxonomy") {
      const format = columnFormats[column];
      return formatColumnValue(item.count || 0, format);
    }

    // Handle meta columns
    if (metaColumns.includes(column)) {
      const value = item.meta?.[column];
      const format = columnFormats[column];

      // Special handling for media_gallery type
      if (format && format.type === "media_gallery") {
        return (
          <MediaGalleryCell value={value} restUrl={restUrl} nonce={nonce} />
        );
      }

      return formatColumnValue(value, format);
    }

    // Handle regular columns with format
    const value = item[column];
    const format = columnFormats[column];
    return formatColumnValue(value, format);
  };

  return (
    <div className="arraysubscription-dl-table-container">
      <Header
        singular={singular}
        plural={plural}
        addUrl={addUrl}
        onAddNew={onAddNew}
        customButtons={customButtons}
        bulkAction={bulkAction}
        selectedItems={selectedItems}
        allowedActions={allowedActions}
        search={search}
        onBulkActionChange={setBulkAction}
        onBulkActionApply={handleBulkAction}
        onSearchChange={setSearch}
        statusList={statusList}
        statusFilter={statusFilter}
        statusCounts={statusCounts}
        totalItems={totalItems}
        dataSource={dataSource}
        onStatusChange={(status) => {
          setStatusFilter(status);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {(() => {
            // Determine which component to render: viewComponent or default TableView
            const BodyComponent = viewComponent || TableView;

            // Props for TableView (includes extra props)
            const tableProps = {
              items,
              columns: allColumns,
              columnFormats,
              selectedItems,
              onSelectAll: handleSelectAll,
              sortBy,
              sortOrder,
              onSort: handleSort,
              plural,
              editUrl,
              allowedActions,
              customActions,
              renderColumnValue,
              onSelectItem: handleSelectItem,
              onTrash: handleTrash,
              onRestore: handleRestore,
              onDelete: handleDelete,
              onRefresh: handleRefresh,
              isFeaturedImage,
              restUrl,
              nonce,
              dataSource,
            };

            // Props for CardView (subset of tableProps)
            const cardProps = {
              items,
              plural,
              editUrl,
              onEdit,
              allowedActions,
              customActions,
              selectedItems,
              onSelectItem: handleSelectItem,
              onTrash: handleTrash,
              onRestore: handleRestore,
              onDelete: handleDelete,
              onRefresh: handleRefresh,
              isFeaturedImage,
              restUrl,
              nonce,
              ...viewExtraProps,
            };

            // Use tableProps for TableView, cardProps for CardView
            const props = BodyComponent === TableView ? tableProps : cardProps;

            return <BodyComponent {...props} />;
          })()}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default DataList;
