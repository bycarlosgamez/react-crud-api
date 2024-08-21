import CrudTableRow from './CrudTableRow';

const CrudTable = ({ db, handleDelete, setDataEdit }) => {
  const tableRows = db.map((el) => {
    return (
      <CrudTableRow
        key={el.id}
        el={el}
        handleDelete={handleDelete}
        setDataEdit={setDataEdit}
      />
    );
  });

  return (
    <>
      <h3>Data Table</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {db.length === 0 ? (
            <tr>
              <td colSpan='3'>Database Empty</td>
            </tr>
          ) : (
            tableRows
          )}
        </tbody>
      </table>
    </>
  );
};

export default CrudTable;
