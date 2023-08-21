import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CartPage from './CartPage';
import StaffDetails from './StaffDetails';
import { StaffProvider } from './StaffContext';
import AddStaff from './AddStaff';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <StaffProvider>
      <Router>
        <Routes>
          <Route path="/cart/:staffId" element={<CartPage />} />
          <Route path="/staff-details/:staffId" element={<StaffDetails />} />
          <Route path="/add-staff" element={<AddStaff />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </StaffProvider>
  );
}

export default App;

