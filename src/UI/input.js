const Input = (props) => {
  return (
    <input
      className="placeholder:text-sm my-1 px-2 py-2 border-2 border-mercuryGray focus:border-info-300 rounded-lg outline-0"
      {...props}
    />
  );
};

export default Input;
