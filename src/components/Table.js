// Package Import
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import format from "date-fns/format";
// import { CircularProgress } from "@mui/material";

// Comp Import
import TableFooter from "./TableFooter";
import TableCol from "./TableCol";

const getAllTransactionURL = process.env.REACT_APP_GET_ALL_EXPENCE;
const token = process.env.REACT_APP_TOKEN;

const Table = ({ openPopup, date, sendData }) => {
  // Initial Data from API
  const [tableData, setTableData] = useState([]);
  // Loading State
  const [loading, setLoading] = useState(true);
  // Error Handling while API Call
  const [error, setError] = useState("");
  // Per Page Content
  const [show, setShow] = useState(10);

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

  const changePage = useCallback(
    (start, end) => {
      setPagination({
        start: start,
        end: end,
        totalPage: Math.ceil(tableData.length / show),
      });
    },
    [show, tableData]
  );

  const editHandler = (e, id) => {
    e.preventDefault();
    const item = tableData.filter((item) => {
      return item.id === id;
    });
    openPopup(e, { edit: true });
    sendData(item);
  };

  useEffect(() => {
    const { startDate, endDate } = date;

    if (!startDate || !endDate) {
      return;
    }

    (async (startDate, endDate) => {
      setError("");
      const formData = new FormData();
      formData.append("startDate", format(startDate, "dd/MM/yyyy"));
      formData.append("endDate", format(endDate, "dd/MM/yyyy"));
      try {
        const getData = await axios.post(getAllTransactionURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
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
    })(startDate, endDate);
  }, [show, date]);

  return (
    <>
      <div className="my-3 md:my-2 overflow-scroll overflow-y-hidden sm:overflow-hidden">
        <table className="shadow-xl shadow-gray-600 table-auto w-[640px] sm:w-full">
          <thead>
            <tr className="w-auto text-xs md:text-sm text-left border-b-2 border-inactiveGray bg-lightGray text-ShuttleGray">
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
                  <div className="flex justify-center items-center my-2">
                    {/* <CircularProgress /> */}
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
        data={{pagination, totalItem: tableData.length}}
        changePage={changePage}
      />
    </>
  );
};

export default Table;
