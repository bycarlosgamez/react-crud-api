import CrudTableRow from './CrudTableRow';

const CrudTable = ({ db, handleDelete, setDataEdit }) => {
  return (
    <div>
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
          {db.length > 0 ? (
            db.map((el) => {
              return (
                <CrudTableRow
                  key={el.id}
                  el={el}
                  handleDelete={handleDelete}
                  setDataEdit={setDataEdit}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan='3'>Database Empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
