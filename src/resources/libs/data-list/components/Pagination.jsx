import React from "react";

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="arraysubscription-dl-pagination">
      <div className="arraysubscription-dl-pagination-info">
        {totalItems} {totalItems === 1 ? "item" : "items"}
      </div>
      <div className="arraysubscription-dl-pagination-buttons">
        <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
          «
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </button>
        <span className="arraysubscription-dl-page-info">
          {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
