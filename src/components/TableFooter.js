// Comp Import
import Pagination from "./Pagination";

const TableFooter = ({ showHandler, changePage, show, data }) => {
  const { pagination, totalItem } = data;
  return (
    <div
      id="tableFooter"
      className="flex flex-row justify-between items-center"
    >
      <div className="my-1">
        <p className="inline-block mx-2 text-sm">Show</p>
        <select
          className="text-sm bg-white"
          onChange={(e) => showHandler(+e.target.value)}
        >
          <option>10</option>
          <option>15</option>
          <option>25</option>
        </select>
        <p className="block mx-2 text-sm">
          Showing ({pagination.start + 1} -{" "}
          {pagination.end > totalItem ? totalItem : pagination.end}) of{" "}
          {totalItem} items
        </p>
      </div>
      <div>
        <Pagination
          totalPage={pagination.totalPage}
          paginate={changePage}
          postperpage={show}
        />
      </div>
    </div>
  );
};

export default TableFooter;
