import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OtpForSignup from "./pages/OtpForSignup";
import Layout from "./layout/Layout";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sendOtp" element={<OtpForSignup />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
