import Form from "./Form";
const Modal = ({ closeModal }) => {
  return (
    <>
      <div
        onClick={closeModal}
        className="w-screen h-screen fixed inset-0 bg-black opacity-40"
      ></div>
      <div className="w-11/12 md:w-5/12 rounded-lg h-auto fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white opacity-100">
        <Form closeModal={closeModal} />
      </div>
    </>
  );
};

export default Modal;
