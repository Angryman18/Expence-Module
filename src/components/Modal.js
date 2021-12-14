const Modal = ({children, closeModal}) => {
  return (
    <>
      <div
        onClick={closeModal}
        className="w-screen h-screen fixed inset-0 bg-black opacity-40"
      ></div>
      <div className="w-11/12 md:w-6/12 lg:w-2/6 rounded-lg h-auto fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white opacity-100">
        {children}
      </div>
    </>
  );
};

export default Modal;
