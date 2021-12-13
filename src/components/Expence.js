import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Table from "./Table";

import { useState } from "react";
import Modal from "./Modal";
// import { DateRange } from "react-date-range";

const Expence = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [popup, setPopup] = useState(false);


  //   const [state, setState] = useState([
  //     {
  //       startDate: new Date(),
  //       endDate: null,
  //       key: "selection",
  //     },
  //   ]);

  //   const [select, setSelect] = useState(false);

  //   const selectHandler = (e) => {
  //     e.preventDefault();
  //     setSelect(!select);
  //   };


  const closeModal = (e) => {
    e.preventDefault();
    setPopup(false);
  };

  const getData = (item) => {
      setPopup(true)
  }

  return (
    <>
      <div className="font-poppins flex justify-center items-center w-screen mt-4">
        <div className="w-full md:w-3/4 h-full">
          <div className="text-xl mx-4 md:text-2xl font-bold">
            Expence Inventory
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mx-2">
            <div className="flex md:flex-row">
              {/* <p className="m-2">Start Date: </p> */}
              <input
                onChange={(e) =>
                  setDate({ ...date, startDate: e.target.value })
                }
                type="date"
                className="border border-gray-100 bg-info-100 rounded-lg px-2 m-2  font-normal text-sm"
              />
              <p className="m-2">To</p>
              <input
                type="date"
                className="border border-gray-100 bg-info-100 rounded-lg px-2 m-2 font-normal text-sm"
              />
              {/* <div>
              <button onClick={selectHandler}>Select Date</button>
              {select && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  className=""
                />
              )}
            </div> */}
            </div>
            <button
              onClick={(e) => setPopup(true)}
              className="duration-75 bg-navy-100 text-xs border px-6 py-2 text-white font-bold rounded-lg"
            >
              ADD
            </button>
          </div>
          <Table sendData={getData} />
        </div>
      </div>
      {popup && <Modal closeModal={closeModal} />}
    </>
  );
};

export default Expence;
