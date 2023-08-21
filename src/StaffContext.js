import React, { createContext, useContext, useState } from 'react';

const StaffContext = createContext();

export const useStaff = () => {
  return useContext(StaffContext);
};

export const StaffProvider = ({ children }) => {
  const [staffList, setStaffList] = useState([]);

  const value = {
    staffList,
    setStaffList
  };

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  );
};

export default StaffContext;
