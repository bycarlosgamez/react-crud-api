import { useState, useEffect } from 'react';
import { helperHttp } from '../helpers/helperHttps';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

const Crud = () => {
  const [dataBase, setDataBase] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);

  let api = helperHttp();
  let url = 'http://localhost:5000/guitars';

  useEffect(() => {
    api.get(url).then((res) => {
      if (!res.err) {
        setDataBase(res);
      } else {
        setDataBase(null);
      }
    });
  }, []);

  const createData = (data) => {
    data.id = Date.now();
    setDataBase((prevData) => {
      return [...prevData, data];
    });
  };

  const updateData = (data) => {
    setDataBase((prevData) =>
      prevData.map((el) => {
        return el.id === data.id ? data : el;
      })
    );
  };

  const deleteData = (data) => {
    let isDeleted = window.confirm(
      `Are you sure you want to delete the entry ${data.name}?`
    );

    if (isDeleted) {
      setDataBase((prevData) =>
        prevData.filter((el) => {
          return data.id !== el.id;
        })
      );
    } else {
      return;
    }
  };

  return (
    <>
      <h1>CRUD</h1>
      <CrudForm
        dataEdit={dataEdit}
        handleCreate={createData}
        handleUpdate={updateData}
        setDataEdit={setDataEdit}
      />
      <CrudTable
        db={dataBase}
        setDataEdit={setDataEdit}
        handleDelete={deleteData}
      />
    </>
  );
};

export default Crud;
