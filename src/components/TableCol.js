const TableCol = (props) => {
  return (
    <tr
      onClick={(e) => props.editHandler(e, props.id)}
      className="cursor-pointer hover:bg-lightGray text-left text-xs md:text-sm border-b-2 border-inactiveGray"
    >
      <td className="w-1/6 pl-4 p-2">{props.categoryText}</td>
      <td className="w-1/6">{props.title}</td>
      <td className="w-2/6">{props.description}</td>
      <td className="w-1/6">{props.amount}</td>
      <td className="w-1/6">{props.expDateToDisplay}</td>
    </tr>
  );
};

export default TableCol;
