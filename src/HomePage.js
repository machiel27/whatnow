import React, { useEffect, useState } from "react";
import { useStaffList } from "./useStaffList";
import { Link } from "react-router-dom";
import { useStaff } from "./StaffContext";
import whatnowLogo from "./whatnow_logo.png";
import Spinner from "./Spinner";

function HomePage() {
  const refetchStaffList = useStaffList();
  const { staffList } = useStaff();
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        if (staffList.length === 0) {
          setLoadingStaff(true);
          await refetchStaffList();
          setLoadingStaff(false);
        } else {
          setLoadingStaff(false);
        }
      } catch (error) {
        setLoadingStaff(false);
        if (error.response && error.response.status === 500) {
            setErrorMessage("It seems like my Azure Database Server is still waking up, you might have to refresh the page a few times. If the issue persists please reach out to me.");
        } else {
            setErrorMessage("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchStaff();
  }, [staffList, refetchStaffList]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center main-logo">
        <img src={whatnowLogo} alt="whatnow logo" />
      </div>
      <h1 className="mb-4">
        Welcome to the <i>whatnow</i> Inventory Ordering System
      </h1>
      <p>
        Since we don't have a login system, please don't change anyone else's
        cart ;)
      </p>
      <p>
        If you can't find your name in the list, please click on the "Add New
        Staff Member" button below
      </p>

      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
            <button type="button" className="close" onClick={() => setErrorMessage(null)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
      )}

      {loadingStaff ? (
        <Spinner />
      ) : (
        <div className="list-group">
          {staffList.map((staff) => (
            <div
              key={staff.staffID}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {staff.name} {staff.surname}
              <div className="gridBtns">
                <Link
                  to={`/staff-details/${staff.staffID}`}
                  className="btn btn-info btn-sm"
                >
                  <i className="material-icons align-middle">perm_identity</i>
                  View Details
                </Link>
                <Link
                  to={`/cart/${staff.staffID}`}
                  className="btn btn-primary btn-sm"
                >
                  <i className="material-icons align-middle">shopping_bag</i>
                  View Cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <Link to="/add-staff" className="btn btn-success">
          <i className="material-icons align-middle icon-margin">person_add</i>
          Add New Staff Member
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
