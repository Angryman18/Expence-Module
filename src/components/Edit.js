// Comp Import
import Input from "../UI/input";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";

const getCategoryURL = process.env.REACT_APP_CATEGORIES;
const addExpenceURL = process.env.REACT_APP_ADD_EXPENCE;
const token = process.env.REACT_APP_TOKEN;

const Edit = ({ closeModal, editItem }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: editItem.id,
    categoryId: editItem.categoryId,
    title: editItem.title,
    description: editItem.description,
    amount: editItem.amount,
    expDateToDisplay: editItem.expDateToDisplay,
  });


  const [expDate, setDate] = useState(
    new Date(formData.expDateToDisplay.split("/").reverse().join("-"))
  );

  const getFormData = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // setLoading(true);
    const { title, description, amount } = formData;
    if (
      title.trim().length !== 0 &&
      description.trim().length !== 0 &&
      amount > 0 &&
      expDate
    ) {
      setError(null);

      //   {
      //     "id": 1,
      //     "categoryId": 1,
      //     "title": "Hello World",
      //     "description": "Pen was out of stock",
      //     "amount": 20.00,
      //     "expDate": "15/12/2021"
      // }

      const Obj = {
        id: formData.id,
        categoryId: formData.categoryId,
        title: formData.title,
        description: formData.description,
        amount: formData.amount,
        expDate: format(expDate, "dd/MM/yyyy"),
      };
      (async (Obj) => {
        setLoading(true);
        try {
          const res = await axios.post(addExpenceURL, Obj, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status !== 200) {
            throw new Error("Failed to Edit Expence");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setError(null);
          setLoading(false);
          closeModal(e);
        }
      })(Obj);

      return false;
    }
    setError("Fields Cannot Be Empty");
  };

  useEffect(() => {
    let requesting = true;
    axios
      .get(getCategoryURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((categories) => {
        if (requesting) {
          setCategories(categories.data);
        }
      })
      .catch(() => {
        setError("Failed to Fetch Categories");
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
          className="placeholder:text-sm my-1 px-2 py-1 bg-white border-2 border-mercuryGray focus:border-info-300 rounded-lg outline-0"
          placeholder="Select Category"
          style={{ width: "100%" }}
          name="categoryId"
          onChange={(e) => getFormData(e)}
          defaultValue={+formData.categoryId}
        >
          {/* <option id="select-item" value="fasd">
            Select Category
          </option> */}
          {categories.map((item) => {
            if (item.id === formData.categoryId) {
              return (
                <option key={item.id} selected={true}>
                  {item.category}
                </option>
              );
            } else {
              return (
                <option value={item.id} key={item.id}>
                  {item.category}
                </option>
              );
            }
          })}
        </select>
        <Input
          name="title"
          type="text"
          value={formData.title}
          placeholder="Title"
          style={{ width: "100%" }}
          onChange={(e) => getFormData(e)}
        />
        <Input
          value={formData.description}
          type="text"
          placeholder="Description"
          style={{ width: "100%" }}
          name="description"
          onChange={(e) => getFormData(e)}
        />
        <div className="flex w-full">
          <Input
            value={formData.amount}
            type="number"
            placeholder="Enter Amount"
            style={{ width: "100%", marginRight: "10px" }}
            name="amount"
            onChange={(e) => getFormData(e)}
          />
          <DatePicker
            dateFormat="dd/MM/yyyy"
            placeholderText="Expence Date DD/MM/YYYY"
            className="placeholder:text-sm my-1 w-full px-2 py-1 border-2 border-mercuryGray focus:border-info-300 rounded-lg outline-0"
            selected={expDate}
            onChange={(date) => setDate(date)}
            isClearable={true}
          />
        </div>
        <div className="float-right my-2">
          <Button
            disabled={loading}
            onClick={closeModal}
            className="font-bold disabled:bg-gray disabled:pointer-events-none mx-1 text-sm px-4 py-2 bg-navy-100 text-white rounded-lg border-matBrown"
          >
            CLOSE
          </Button>
          <Button
            disabled={loading}
            className="font-bold mx-1 disbaled:cursor-not-allowed w-[75px] text-center disabled:text-gray-100 disabled:pointer-events-none text-sm px-2 py-2 bg-mercuryGray text-black rounded-lg border-matBrown"
            onClick={submitHandler}
          >
            <div className="flex justify-center items-center">
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              )}
              {!loading && <span>SAVE</span>}
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
