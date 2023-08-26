import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStaff } from "./api";
import BackArrow from "./BackArrow";

function AddStaff() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      Array.from(form.elements).forEach((input) => {
        if (!input.validity.valid) {
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });
    } else {
      e.preventDefault();
      try {
        await addStaff(formData);
        navigate("/");
      } catch (error) {
        console.error("Error adding staff:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <BackArrow />
      <h2 className="mb-4">Add New Staff Member</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <fieldset>
          <legend>Personal Details</legend>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
              id="name"
              required
            />
            <div className="invalid-feedback">Please provide a name.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Surname:
            </label>
            <input
              type="text"
              name="surname"
              onChange={handleChange}
              className="form-control"
              id="surname"
              required
            />
            <div className="invalid-feedback">Please provide a surname.</div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Address</legend>
          <div className="mb-3">
            <label htmlFor="addressType" className="form-label">
              Address Type:
            </label>
            <select
              name="addressType"
              onChange={handleChange}
              className="form-control"
              id="addressType"
              required
            >
              <option value="" disabled selected>
                Select Address Type
              </option>
              <option value="business">Business</option>
              <option value="residential">Residential</option>
            </select>
            <div className="invalid-feedback">
              Please select an address type.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="streetAddress" className="form-label">
              Street Address:
            </label>
            <input
              type="text"
              name="streetAddress"
              onChange={handleChange}
              className="form-control"
              id="streetAddress"
              required
            />
            <div className="invalid-feedback">
              Please provide a street address.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="suburb" className="form-label">
              Suburb:
            </label>
            <input
              type="text"
              name="suburb"
              onChange={handleChange}
              className="form-control"
              id="suburb"
              required
            />
            <div className="invalid-feedback">Please provide a suburb.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City:
            </label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              className="form-control"
              id="city"
              required
            />
            <div className="invalid-feedback">Please provide a city.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label">
              Postal Code:
            </label>
            <input
              type="text"
              name="postalCode"
              onChange={handleChange}
              className="form-control"
              id="postalCode"
              required
              pattern="\d{4}"
            />
            <div className="invalid-feedback">
              Please provide a valid postal code.
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary mt-4">
          Add Staff
        </button>
      </form>
    </div>
  );
}

export default AddStaff;
