// Comp Import
import Pagination from "./Pagination";

const TableFooter = ({showHandler, changePage, show, totalPage}) => {
  return (
    <div
      id="tableFooter"
      className="flex flex-row justify-between items-center"
    >
      <div>
        <p className="inline-block my-4 ml-2 mr-1 text-sm">Show</p>
        <select className="text-sm" onChange={(e) => showHandler(+e.target.value)}>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>
      <div>
        <Pagination
          totalPage={totalPage}
          paginate={changePage}
          postperpage={show}
        />
      </div>
    </div>
  );
};

export default TableFooter;
