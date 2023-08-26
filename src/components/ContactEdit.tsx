import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editContact } from '../Redux/action';

interface Form {
  first_name: string;
  last_name: string;
  mob: string;
  status: string;
}

function EditContact() {
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useDispatch();
  const allContacts = useSelector((store: any) => store.contacts);
  const [form, setForm] = useState<Form>({
    first_name: '',
    last_name: '',
    mob: '',
    status: 'active', 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function handleSave() {
    if (id) {
      dispatch(editContact({ ...form, id: parseInt(id) }));
    }
  }

  useEffect(() => {
    if (id) {
      const contact = allContacts.find((el: any) => el.id === parseInt(id));
      if (contact) {
        setForm(contact);
      }
    }
  }, [allContacts, id]);

  return (
    <div className="w-1/2 mx-auto my-4 pt-16">
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="first-name">
          First Name
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md transition duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500"
          id="first-name"
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="last-name">
          Last Name
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md transition duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500"
          id="last-name"
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="last-name">
          Mobile Number
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md transition duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500"
          id="last-name"
          type="number"
          name="mob"
          value={form.mob}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="status">
          Status
        </label>
        <select
          className="w-full border border-gray-400 p-2 rounded-md transition duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500"
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleSave}
      >
        Save Contact
      </button>
    </div>
  );
}

export default EditContact;
