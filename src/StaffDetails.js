import React from 'react';
import { useParams } from 'react-router-dom';
import { useStaff } from './StaffContext';
import BackArrow from './BackArrow';

function StaffDetails() {
  const { staffId } = useParams();
  const { staffList } = useStaff();

  const staff = staffList.find(s => s.staffID.toString() === staffId);

  if (!staff) return <div className="alert alert-danger">No staff details available.</div>;

  return (
    <div className="container mt-5">
      <BackArrow />
      <h2 className="mb-4">Staff Details for {staff.name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Personal Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row">
                <div className="col-4"><strong>Name:</strong></div>
                <div className="col-8">{staff.name}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-4"><strong>Surname:</strong></div>
                <div className="col-8">{staff.surname}</div>
              </div>
            </li>
          </ul>

          <h5 className="card-title mt-4">Address</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row">
                <div className="col-4"><strong>Address Type:</strong></div>
                <div className="col-8">{staff.addressType}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-4"><strong>Street Address:</strong></div>
                <div className="col-8">{staff.streetAddress}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-4"><strong>Suburb:</strong></div>
                <div className="col-8">{staff.suburb}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-4"><strong>City:</strong></div>
                <div className="col-8">{staff.city}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-4"><strong>Postal Code:</strong></div>
                <div className="col-8">{staff.postalCode}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StaffDetails;
