const CrudTableRow = ({ el, handleDelete, setDataEdit }) => {
  return (
    <tr>
      <td>{el.name}</td>
      <td>{el.brand}</td>
      <td>
        <button onClick={() => setDataEdit(el)}>Edit</button>
        <button onClick={() => handleDelete(el)}>Delete</button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
