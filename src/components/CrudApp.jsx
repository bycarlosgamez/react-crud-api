import { useState, useEffect } from 'react';
import { helperHttp } from '../helpers/helperHttps';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Message from './Message';

const Crud = () => {
  const [dataBase, setDataBase] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let api = helperHttp();
  let url = 'http://localhost:5000/guitars';

  useEffect(() => {
    setIsLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setDataBase(res);
        setError(null);
      } else {
        setDataBase(null);
        setError(res);
      }

      setIsLoading(false);
    });
  }, [url]);

  const createData = (data) => {
    data.id = Date.now();

    let options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    };

    api.post(url, options).then((res) => {
      if (!res.err) {
        setDataBase((prevData) => {
          return [...prevData, res];
        });
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    console.log(endpoint);

    let options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        setDataBase((prevData) =>
          prevData.map((el) => {
            return el.id === data.id ? data : el;
          })
        );
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (data) => {
    let isDeleted = window.confirm(
      `Are you sure you want to delete the entry ${data.name}?`
    );

    if (isDeleted) {
      let endpoint = `${url}/${data.id}`;
      let options = {
        headers: { 'content-type': 'application/json' },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          setDataBase((prevData) =>
            prevData.filter((el) => {
              return data.id !== el.id;
            })
          );
        } else {
          setError(res);
        }
      });
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

      {isLoading && <Loader />}
      {error && (
        <Message
          msg={`Error ${error.status}: ${error.statusText}`}
          bgColor='#dc3545'
        />
      )}

      {dataBase && (
        <CrudTable
          db={dataBase}
          setDataEdit={setDataEdit}
          handleDelete={deleteData}
        />
      )}
    </>
  );
};

export default Crud;
