import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStaff } from './api';
import { useStaff } from './StaffContext';

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
    <div>
      <h1>Select a Staff Member</h1>
      <ul>
        {staffList.map(staff => (
          <li key={staff.staffID}>
            {staff.name} {staff.surname}
            <Link to={`/staff-details/${staff.staffID}`}>View Details</Link>
            <Link to={`/cart/${staff.staffID}`}>View Basket</Link>
          </li>
        ))}
      </ul>
      <Link to="/add-staff">Add New Staff Member</Link>
    </div>
  );
}

export default HomePage;
