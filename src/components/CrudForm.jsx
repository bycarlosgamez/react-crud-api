import { useState, useEffect } from 'react';

const initialFormState = {
  name: '',
  brand: '',
  id: null,
};

const CrudForm = ({ handleCreate, handleUpdate, setDataEdit, dataEdit }) => {
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (dataEdit) {
      setFormState(dataEdit);
    } else {
      setFormState(initialFormState);
    }
  }, [dataEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.name || !formState.brand) {
      alert('Missing info');
      return;
    }

    if (formState.id === null) {
      handleCreate(formState);
    } else {
      handleUpdate(formState);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setFormState(initialFormState);
    setDataEdit(null);
  };

  return (
    <div>
      <h3>{dataEdit ? 'Edit entry' : 'Add new entry'}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          onChange={handleChange}
          value={formState.name}
        />
        <label htmlFor='brand'>Brand</label>
        <input
          type='text'
          name='brand'
          id='brand'
          onChange={handleChange}
          value={formState.brand}
        />
        <input type='submit' value='Send' />
        <input type='reset' value='Reset' onClick={handleReset} />
      </form>
    </div>
  );
};

export default CrudForm;
