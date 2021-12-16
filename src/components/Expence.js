// Package Import
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Button } from "@mui/material";

// Comp Import
import Table from "./Table";
import Add from "./Add";
import Modal from "./Modal";
import Edit from "./Edit";

const Expence = () => {
  const defaultStartDate = new Date();
  const defaultEndDate = new Date().setDate(defaultStartDate.getDate() + 7);
  const [dateRange, setDateRange] = useState([
    defaultStartDate,
    defaultEndDate,
  ]);
  const [startDate, endDate] = dateRange;
  const [actions, setActions] = useState({});

  const [popup, setPopup] = useState(false);
  const [editItem, setEditItem] = useState()

  const closeModal = (e) => {
    e.preventDefault();
    setPopup(false);
  };

  const actionHandler = (e, objs) => {
    e.preventDefault();
    setActions(objs)
    setPopup(true);
  };

  const getData = (item) => {
    setEditItem(item)
  }

  // const openPopup = (item) => {
  //   setPopup(true);
  // };

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
              onClick={(e) => actionHandler(e, {add: true})}
              className="duration-75 bg-navy-100 text-xs border px-6 py-2 text-white font-bold rounded-lg"
            >
              ADD
            </button>
          </div>
          <Table date={{ startDate, endDate }} sendData={getData} openPopup={actionHandler} />
        </div>
      </div>
      {popup && (
        <Modal closeModal={closeModal}>
          {actions?.add && <Add closeModal={closeModal} />}
          {actions?.edit && <Edit editItem={editItem[0]} closeModal={closeModal} />}
        </Modal>
      )}
    </>
  );
};

export default Expence;
