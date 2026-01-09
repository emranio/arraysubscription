import React from "react";
import { Link } from "react-router-dom";

const RowActions = ({
  item,
  editUrl,
  allowedActions,
  customActions = [],
  onTrash,
  onRestore,
  onDelete,
  onRefresh,
}) => {
  const handleCustomAction = async (action) => {
    try {
      await action.callback(item.id, item);
      // Refresh the table after successful action
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error(`Error executing ${action.name}:`, error);
      alert(`Failed to ${action.label.toLowerCase()}`);
    }
  };

  return (
    <div className="arraysubscription-dl-actions">
      {item.status !== "trash" ? (
        <>
          {/* Custom actions before standard actions */}
          {customActions.map((action, idx) => (
            <React.Fragment key={action.name}>
              {idx > 0 && (
                <span className="arraysubscription-dl-separator">|</span>
              )}
              <button
                className={item.status}
                onClick={() => handleCustomAction(action)}
              >
                {action.label}
              </button>
              <span className="arraysubscription-dl-separator">|</span>
            </React.Fragment>
          ))}

          {allowedActions.includes("edit") && (
            <Link className={item.status} to={`${editUrl}/${item.id}`}>
              Edit
            </Link>
          )}
          {allowedActions.includes("edit") &&
            allowedActions.includes("trash") && (
              <span className="arraysubscription-dl-separator">|</span>
            )}
          {allowedActions.includes("trash") && (
            <button className={item.status} onClick={() => onTrash(item.id)}>
              Trash
            </button>
          )}
        </>
      ) : (
        <>
          {allowedActions.includes("restore") && (
            <button className={item.status} onClick={() => onRestore(item.id)}>
              Restore
            </button>
          )}
          {allowedActions.includes("restore") &&
            allowedActions.includes("delete") && (
              <span className="arraysubscription-dl-separator">|</span>
            )}
          {allowedActions.includes("delete") && (
            <button className={item.status} onClick={() => onDelete(item.id)}>
              Delete Permanently
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RowActions;
