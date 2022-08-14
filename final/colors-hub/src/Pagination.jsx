import "./Pagination.css";

const Pagination = ({ currentPage, nextPage, lastPage, pageLimit, onPageChange }) => {
  const getPaginationGroup = () => {
    return new Array(lastPage).fill().map((_, idx) => 1 + idx);
  };
  const totalPages = getPaginationGroup();
  return (
    totalPages.length > 0 && (
      <ul className="pagination">
        <li className="move-left" onClick={onPageChange}>
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </li>
        {totalPages.map((p) => (
          <li
            key={p}
            data-page={p}
            onClick={onPageChange}
            className={currentPage === p ? `pages active` : "pages"}
          >
            {p}
          </li>
        ))}
        <li className="move-right" onClick={onPageChange}>
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </li>
      </ul>
    )
  );
};

export default Pagination;
