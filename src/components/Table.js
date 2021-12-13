import data from "../Dummy/data";
import Button from "../UI/Button";
import React, { useState } from "react";
import axios from "axios";

const Table = ({ sendData }) => {
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const editHandler = (e, id) => {
    e.preventDefault();
    const item = tableData.filter((item) => {
      return item.id === id;
    });
    sendData(item);
  };

  React.useEffect(() => {
    (async () => {
      setError("");
      try {
        const getData = await axios(
          "https://jsonplaceholder.typicode.com/users"
        );
        setTableData(getData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="my-3 md:my-2 overscroll-auto overflow-scroll lg:overflow-hidden">
      <table className="shadow-xl shadow-gray-600 table-auto w-full min-w-min">
        <thead>
          <tr className="text-sm text-left border-b-2 border-inactiveGray bg-lightGray text-ShuttleGray">
            <th className="w-2/12 py-3 pl-2">CATEGORY</th>
            <th className="w-2/12">TITLE</th>
            <th className="w-3/12">DESCRIPTION</th>
            <th className="w-2/12">AMOUNT</th>
            <th className="w-2/12">EXP DATE</th>
            <th className="w-1/12 pr-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            tableData &&
            tableData.map((item, idx) => {
              return (
                <tr
                  key={idx}
                  className="text-left text-sm md:text-base border-b-2 border-inactiveGray"
                >
                  <td className="w-2/12 p-2">{item.name}</td>
                  <td className="w-2/12">{item.username}</td>
                  <td className="w-3/12">{item.email}</td>
                  <td className="w-3/12">{item.website}</td>
                  <td className="w-2/12">{item.company.name}</td>
                  <td className="w-1/12">
                    <Button
                      onClick={(e) => editHandler(e, item.id)}
                      text="Edit"
                    />
                  </td>
                </tr>
              );
            })}
          {!loading && error && !tableData ? (
            <tr>
              <td
                colSpan="6"
                className="text-center text-darkGray py-2 border-b-2 border-inactiveGray"
              >
                Error Fetching Data
              </td>
            </tr>
          ) : null}
          {!loading && !tableData && !error ? (
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
  );
};

export default Table;
