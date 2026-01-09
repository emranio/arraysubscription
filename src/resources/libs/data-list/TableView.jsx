import React from "react";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

const TableView = ({
  items,
  columns,
  columnFormats,
  selectedItems,
  onSelectAll,
  sortBy,
  sortOrder,
  onSort,
  plural,
  editUrl,
  allowedActions,
  customActions,
  renderColumnValue,
  onSelectItem,
  onTrash,
  onRestore,
  onDelete,
  onRefresh,
  isFeaturedImage,
  restUrl,
  nonce,
  dataSource = "post_type",
}) => {
  return (
    <div className="arraysubscription-dl-table-wrapper">
      <table className="wp-list-table widefat fixed striped arraysubscription-dl-table">
        <TableHead
          columns={columns}
          columnFormats={columnFormats}
          selectedItems={selectedItems}
          items={items}
          onSelectAll={onSelectAll}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={onSort}
        />
        <TableBody
          items={items}
          columns={columns}
          plural={plural}
          editUrl={editUrl}
          allowedActions={allowedActions}
          customActions={customActions}
          selectedItems={selectedItems}
          renderColumnValue={renderColumnValue}
          onSelectItem={onSelectItem}
          onTrash={onTrash}
          onRestore={onRestore}
          onDelete={onDelete}
          onRefresh={onRefresh}
          isFeaturedImage={isFeaturedImage}
          restUrl={restUrl}
          nonce={nonce}
          dataSource={dataSource}
        />
      </table>
    </div>
  );
};

export default TableView;
