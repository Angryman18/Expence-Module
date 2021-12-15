// Package Import
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Comp Import
import Table from "./Table";
import Form from "./Form";
import Modal from "./Modal";

const Expence = () => {
  const defaultStartDate = new Date();
  const defaultEndDate = new Date().setDate(defaultStartDate.getDate() + 7);
  const [dateRange, setDateRange] = useState([
    defaultStartDate,
    defaultEndDate,
  ]);
  const [startDate, endDate] = dateRange;

  const [popup, setPopup] = useState(false);

  const closeModal = (e) => {
    e.preventDefault();
    setPopup(false);
  };

  const getData = (item) => {
    setPopup(true);
    console.log(item);
  };

  return (
    <>
      <div className="font-poppins flex justify-center items-center w-screen mt-4">
        <div className="w-full md:w-3/4 h-full">
          <div className="text-xl mx-4 md:text-2xl font-bold">
            Expence Inventory
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mx-2">
            <div className="flex md:flex-row">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date Range"
                className="my-1 px-2 py-1 border-2 border-mercuryGray focus:border-info-300 rounded-lg outline-0"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
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
      {popup && (
        <Modal closeModal={closeModal}>
          <Form closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default Expence;
