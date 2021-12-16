import { useEffect, useState } from "react";

const Pagination = ({ paginate, postperpage, totalPage }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (totalPage && page > totalPage) {
      setPage(totalPage);
    }
    const end = page * postperpage;
    const start = end - postperpage;
    paginate(start, end);
  }, [page, postperpage, totalPage, paginate]);

  return (
    <div className="flex text-blue mx-4">
      <p onClick={() => setPage(1)} className="page-button">
        <i className="fas fa-angle-double-left"></i>
      </p>
      <p
        onClick={() => setPage((pre) => (pre !== 1 ? pre - 1 : pre))}
        className="page-button"
      >
        <i className="fas fa-angle-left"></i>
      </p>
      <p
        onClick={() => setPage((pre) => (pre < totalPage ? pre + 1 : pre))}
        className="page-button"
      >
        <i className="fas fa-angle-right"></i>
      </p>
      <p onClick={() => setPage(totalPage)} className="page-button">
        <i className="fas fa-angle-double-right"></i>
      </p>
    </div>
  );
};

export default Pagination;
