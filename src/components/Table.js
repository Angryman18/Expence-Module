// Package Import
import { useState, useEffect } from "react";
import axios from "axios";

// Comp Import
import TableFooter from "./TableFooter";
import TableCol from "./TableCol";

const Table = ({ sendData }) => {
  // Initial Data from API
  const [tableData, setTableData] = useState([]);
  // Loading State
  const [loading, setLoading] = useState(true);
  // Error Handling while API Call
  const [error, setError] = useState("");
  // Per Page Content
  const [show, setShow] = useState(2);

  const [pagination, setPagination] = useState({
    start: 0,
    end: show,
    totalPage: null,
  });

  const showHandler = (show) => {
    setShow(show);
    setPagination({
      start: 0,
      end: show,
      totalPage: Math.ceil(tableData.length / show),
    });
  };

  const changePage = (start, end) => {
    setPagination({
      start: start,
      end: end,
      totalPage: Math.ceil(tableData.length / show),
    });
  };

  const editHandler = (e, id) => {
    e.preventDefault();
    const item = tableData.filter((item) => {
      return item.id === id;
    });
    sendData(item);
  };

  useEffect(() => {
    (async () => {
      setError("");
      try {
        const getData = await axios(
          "https://jsonplaceholder.typicode.com/users"
        );
        setTableData(getData.data);
        setPagination({
          start: 0,
          end: show,
          totalPage: Math.ceil(getData.data.length / show),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="my-3 md:my-2 overscroll-auto overflow-scroll overflow-y-hidden sm:overflow-hidden">
        <table className="shadow-xl shadow-gray-600 table-auto w-full min-w-min">
          <thead>
            <tr className="text-xs md:text-sm text-left border-b-2 border-inactiveGray bg-lightGray text-ShuttleGray">
              <th className="w-1/6 py-2 pl-4">CATEGORY</th>
              <th className="w-1/6">TITLE</th>
              <th className="w-2/6">DESCRIPTION</th>
              <th className="w-1/6">AMOUNT</th>
              <th className="w-1/6">EXP DATE</th>
            </tr>
          </thead>
          <tbody>
            {/* if there is not loading but tableData has got data */}
            {!loading &&
              tableData.length !== 0 &&
              tableData
                .slice(pagination.start, pagination.end)
                .map((item, idx) => {
                  if (idx + 1 > show) {
                    return null;
                  }
                  return (
                    <TableCol key={idx} editHandler={editHandler} {...item} />
                  );
                })}
            {/* {!loading &&
              tableData.length !== 0 &&
              tableData
                .slice(pagination.start, pagination.end)
                .map((item, idx) => {
                  if (idx + 1 > show) {
                    return null;
                  }
                  return (
                    <tr
                      key={idx}
                      className="text-left text-xs md:text-sm border-b-2 border-inactiveGray"
                    >
                      <td className="w-2/12 pl-4 p-2">{item.name}</td>
                      <td className="w-2/12">{item.username}</td>
                      <td className="w-3/12">{item.email}</td>
                      <td className="w-3/12">{item.website}</td>
                      <td className="w-2/12">{item.company.name}</td>
                      <td className="w-1/12 pr-5">
                        <Button
                          onClick={(e) => editHandler(e, item.id)}
                          text="Edit"
                        />
                      </td>
                    </tr>
                  );
                })} */}
            {/* if not loading and no tableData and got Error */}
            {!loading && error && tableData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-darkGray py-2 border-b-2 border-inactiveGray"
                >
                  Error Fetching Data
                </td>
              </tr>
            ) : null}
            {/* if not loading and no tableData and no error */}
            {!loading && !error && tableData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-darkGray py-2 border-b-2 border-inactiveGray"
                >
                  No Records Found
                </td>
              </tr>
            ) : null}
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <TableFooter
        showHandler={showHandler}
        show={show}
        totalPage={pagination.totalPage}
        changePage={changePage}
      />
    </>
  );
};

export default Table;
