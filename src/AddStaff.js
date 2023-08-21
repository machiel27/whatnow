import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStaff } from './api';

function AddStaff() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStaff(formData);
      navigate('/');
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  return (
    <div>
      <h2>Add New Staff Member</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Surname: </label>
          <input type="text" name="surname" onChange={handleChange} />
        </div>
        {/* Add other fields as needed */}
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
}

export default AddStaff;
