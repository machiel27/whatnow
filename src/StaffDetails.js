import React from 'react';
import { useParams } from 'react-router-dom';
import { useStaff } from './StaffContext';

function StaffDetails() {
  const { staffId } = useParams();
  const { staffList } = useStaff();

  const staff = staffList.find(s => s.staffID.toString() === staffId);

  if (!staff) return <div>No staff details available.</div>;

  return (
    <div>
      <h2>Staff Details for {staff.name} {staff.surname}</h2>
      <p>Name: {staff.name}</p>
      <p>Surname: {staff.surname}</p>
      <p>Address Type: {staff.addressType}</p>
      <p>Street Address: {staff.streetAddress}</p>
      <p>Suburb: {staff.suburb}</p>
      <p>City: {staff.city}</p>
      <p>Postal Code: {staff.postalCode}</p>
    </div>
  );
}

export default StaffDetails;
