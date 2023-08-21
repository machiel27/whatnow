import React from 'react';
import { useParams } from 'react-router-dom';
import { useStaff } from './StaffContext';

function StaffDetails() {
  const { staffId } = useParams();
  const { staffList } = useStaff();

  const staff = staffList.find(s => s.staffID.toString() === staffId);

  if (!staff) return <div className="alert alert-danger">No staff details available.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Staff Details for {staff.name} </h2>
      <div className="card">
        <div className="card-body">
          <p className="card-text"><strong>Name:</strong> {staff.name}</p>
          <p className="card-text"><strong>Surname:</strong> {staff.surname}</p>
          <p className="card-text"><strong>Address Type:</strong> {staff.addressType}</p>
          <p className="card-text"><strong>Street Address:</strong> {staff.streetAddress}</p>
          <p className="card-text"><strong>Suburb:</strong> {staff.suburb}</p>
          <p className="card-text"><strong>City:</strong> {staff.city}</p>
          <p className="card-text"><strong>Postal Code:</strong> {staff.postalCode}</p>
        </div>
      </div>
    </div>
  );
}

export default StaffDetails;
