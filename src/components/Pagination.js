import { useEffect, useState } from "react";

const Pagination = ({ paginate, postperpage, totalPage }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > totalPage) {
      setPage(1);
    }
    const end = page * postperpage;
    const start = end - postperpage;
    paginate(start, end);
  }, [page, postperpage]);

  return (
    <div className="flex text-blue mx-4">
      <a
        onClick={() => setPage(1)}
        className="page-button"
      >
        <i className="fas fa-angle-double-left"></i>
      </a>
      <a
        onClick={() => setPage((pre) => (pre !== 1 ? pre - 1 : pre))}
        className="page-button"
      >
        <i className="fas fa-angle-left"></i>
      </a>
      <a
        onClick={() => setPage((pre) => (pre < totalPage ? pre + 1 : pre))}
        className="page-button"
      >
        <i className="fas fa-angle-right"></i>
      </a>
      <a
        onClick={() => setPage(totalPage)}
        className="page-button"
      >
       <i className="fas fa-angle-double-right"></i>
      </a>
    </div>
  );
};

export default Pagination;
