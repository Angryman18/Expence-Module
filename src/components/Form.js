// Comp Import
import Input from "../UI/input";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const apiURL = process.env.REACT_APP_CATEGORIES;
const token = process.env.REACT_APP_TOKEN;

const Form = ({ closeModal }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Input Data
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    let requesting = true;
    axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((categories) => {
        requesting && setCategories(categories.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      requesting = false;
    };
  }, []);

  return (
    <div className="pt-6 px-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Expence</h1>
        <button onClick={closeModal} className="text-2xl">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <form className="px-2 py-4 text-sm lg:text-base">
        <div className="text-xs text-red">{error && error}</div>
        <select
          className="my-1 px-2 py-1 border-2 border-mercuryGray focus:border-info-300 rounded-lg outline-0"
          placeholder="Select Category"
          style={{ width: "100%" }}
        >
          <option id="select-item" value="0">
            Select Category
          </option>
          {categories.map((item) => (
            <option value={item.category} key={item.id}>
              {item.category}
            </option>
          ))}
        </select>
        <Input type="text" placeholder="Title" style={{ width: "100%" }} />
        <Input
          type="text"
          placeholder="Description"
          style={{ width: "100%" }}
        />
        <div className="flex w-full">
          <Input
            type="number"
            placeholder="Enter Amount"
            style={{ width: "80%", marginRight: "10px" }}
          />
          <DatePicker
            placeholderText="Select Expence Date"
            className="my-1 px-2 py-1 border-2 border-mercuryGray focus:border-info-300 rounded-lg outline-0"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="float-right my-2">
          <Button
            onClick={closeModal}
            text="CLOSE"
            className="font-bold mx-1 text-sm px-4 py-2 bg-navy-100 text-white rounded-lg border-matBrown"
          ></Button>
          <Button
            text="SAVE"
            className="font-bold mx-1 text-sm px-4 py-2 bg-mercuryGray text-black rounded-lg border-matBrown"
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
