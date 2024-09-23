import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCountries } from "./redux/slices/countrySlice";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages//Home";
import Countries from "./pages/Countries";
import Country from "./pages/Country";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryId" element={<Country />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
