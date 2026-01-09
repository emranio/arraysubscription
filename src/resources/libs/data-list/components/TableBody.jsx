import React from "react";
import { Link } from "react-router-dom";
import RowActions from "./RowActions";
import FeaturedImageCell from "./FeaturedImageCell";

const TableBody = ({
  items,
  columns,
  plural,
  editUrl,
  allowedActions,
  customActions = [],
  selectedItems,
  renderColumnValue,
  onSelectItem,
  onTrash,
  onRestore,
  onDelete,
  onRefresh,
  isFeaturedImage = false,
  restUrl,
  nonce,
  dataSource = "post_type",
}) => {
  if (items.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + 1}
            className="arraysubscription-dl-empty-state"
          >
            <p>No {plural.toLowerCase()} found.</p>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id} className="arraysubscription-dl-row">
          <td className="checkbox-col">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => onSelectItem(item.id)}
            />
          </td>
          {columns.map((column) => (
            <td key={column} className={column === "date" ? "date-col" : ""}>
              {column === "title" ? (
                <div className="featured-image">
                  {isFeaturedImage && (
                    <FeaturedImageCell
                      value={item.featured_media}
                      restUrl={restUrl}
                      nonce={nonce}
                    />
                  )}
                  <div>
                    <strong>
                      <Link to={`${editUrl}/${item.id}`}>
                        {dataSource === "taxonomy"
                          ? item.name || "(no name)"
                          : item.title?.rendered || "(no title)"}
                      </Link>
                    </strong>
                    <RowActions
                      item={item}
                      editUrl={editUrl}
                      allowedActions={allowedActions}
                      customActions={customActions}
                      onTrash={onTrash}
                      onRestore={onRestore}
                      onDelete={onDelete}
                      onRefresh={onRefresh}
                    />
                  </div>
                </div>
              ) : (
                renderColumnValue(item, column)
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
