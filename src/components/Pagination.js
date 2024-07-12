// src/components/Pagination.js
import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={handlePrevClick} disabled={page === 1}>
        Prev
      </button>
      <span style={{ margin: "0 10px" }}>
        Page {page} of {totalPages}
      </span>
      <button onClick={handleNextClick} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
