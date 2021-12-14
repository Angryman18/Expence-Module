// Comp Import
import Button from "../UI/Button";

const TableCol = (props) => {
  return (
    <tr
      onClick={(e) => props.editHandler(e, props.id)}
      className="cursor-pointer hover:bg-lightGray text-left text-xs md:text-sm border-b-2 border-inactiveGray"
    >
      <td className="w-1/6 pl-4 p-2">{props.name}</td>
      <td className="w-1/6">{props.username}</td>
      <td className="w-2/6">{props.email}</td>
      <td className="w-1/6">{props.website}</td>
      <td className="w-1/6">{props.company.name}</td>
    </tr>
  );
};

export default TableCol;
