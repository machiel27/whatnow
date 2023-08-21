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
    <div className="container mt-5">
      <h2 className="mb-4">Add New Staff Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            name="name" 
            onChange={handleChange} 
            className="form-control" 
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input 
            type="text" 
            name="surname" 
            onChange={handleChange} 
            className="form-control" 
            id="surname"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressType">Address Type:</label>
          <input 
            type="text" 
            name="addressType" 
            onChange={handleChange} 
            className="form-control" 
            id="addressType"
          />
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress">Street Address:</label>
          <input 
            type="text" 
            name="streetAddress" 
            onChange={handleChange} 
            className="form-control" 
            id="streetAddress"
          />
        </div>
        <div className="form-group">
          <label htmlFor="suburb">Suburb:</label>
          <input 
            type="text" 
            name="suburb" 
            onChange={handleChange} 
            className="form-control" 
            id="suburb"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input 
            type="text" 
            name="city" 
            onChange={handleChange} 
            className="form-control" 
            id="city"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input 
            type="text" 
            name="postalCode" 
            onChange={handleChange} 
            className="form-control" 
            id="postalCode"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">Add Staff</button>
      </form>
    </div>
  );
}

export default AddStaff;
