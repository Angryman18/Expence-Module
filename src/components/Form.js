import Input from "../UI/input";
import Button from "../UI/Button";

const Form = ({ closeModal }) => {
  return (
    <div className="pt-6 px-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Expence</h1>
        <button onClick={closeModal} className="text-2xl">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form className="px-2 py-4">
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
            style={{ width: "50%", marginRight: "10px" }}
          />
          <Input type="text" placeholder="Exp Date" style={{ width: "50%" }} />
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
