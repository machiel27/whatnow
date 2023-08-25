import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import CartPage from "./CartPage";
import StaffDetails from "./StaffDetails";
import { StaffProvider } from "./StaffContext";
import AddStaff from "./AddStaff";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  return (
    <StaffProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/cart/:staffId" element={<CartPage />} />
            <Route path="/staff-details/:staffId" element={<StaffDetails />} />
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </StaffProvider>
  );
}

export default App;
