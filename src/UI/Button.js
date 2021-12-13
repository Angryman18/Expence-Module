const Button = (props) => {
  return <button className="mx-1 duration-75 px-3 py-1 bg-greenBadge-200 text-white rounded-lg hover:bg-charcoal" {...props}>{props.text}</button>;
};

export default Button;
