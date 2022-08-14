import "./Pagination.css";

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const getPaginationGroup = () => {
    return new Array(lastPage).fill().map((_, idx) => 1 + idx);
  };
  const totalPages = getPaginationGroup();
  return (
    totalPages.length > 0 && (
      <ul className="pagination">
        <li className="move-left" data-move="left" onClick={onPageChange}>
          <i className="fa fa-angle-left" data-move="left" aria-hidden="true"></i>
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
        <li className="move-right" data-move="right" onClick={onPageChange}>
          <i className="fa fa-angle-right" aria-hidden="true" data-move="right"></i>
        </li>
      </ul>
    )
  );
};

export default Pagination;
