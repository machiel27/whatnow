import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStaff } from './api';
import { useStaff } from './StaffContext';
import whatnowLogo from './whatnow_logo.png';

function HomePage() {
  const { staffList, setStaffList } = useStaff();

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await getStaff();
        setStaffList(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    }

    if (staffList.length === 0) {
      fetchStaff();
    }
  }, [staffList, setStaffList]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center main-logo">
        <img src={whatnowLogo} alt='whatnow logo' />
      </div>
      <h1 className="mb-4">Welcome to the <i>whatnow</i> Inventory Ordering System</h1>
      <p>Since we don't have a login system, please don't change anyone else's cart ;)</p>
      <p>If you can't find your name in the list, please click on the "Add New Staff Member" button below</p>
      <div className="list-group">
        {staffList.map(staff => (
          <div key={staff.staffID} className="list-group-item d-flex justify-content-between align-items-center">
            {staff.name} {staff.surname}
            <div className="gridBtns">
              <Link to={`/staff-details/${staff.staffID}`} className="btn btn-info btn-sm"><i className="material-icons align-middle">perm_identity</i>View Details</Link>
              <Link to={`/cart/${staff.staffID}`} className="btn btn-primary btn-sm"><i className="material-icons align-middle">shopping_bag</i>View Cart</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/add-staff" className="btn btn-success"><i className="material-icons align-middle icon-margin">person_add</i>Add New Staff Member</Link>
      </div>
    </div>
  );
}

export default HomePage;
