import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/home";
import DashboardView from "../views/Dashboard";
import SponsorView from "../views/sponsorship";


const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SponsorView />} />
        <Route path="/login" element={<Home />} />
        <Route path="/admin" element={<DashboardView />} />
      </Routes>
    </>
  );
};

export default Index;
