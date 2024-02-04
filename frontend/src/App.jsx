import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobalContext } from "./components/globalContext.jsx";
import Home from "./components/pages/Home.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import Login from "./components/pages/Login.jsx";
import Profile from "./components/pages/Profile.jsx";
import About from "./components/pages/About.jsx";
import Navbar from "./components/Items/Navbar.jsx";
import bgImage from "./components/styles/background.png";

const App = () => {
  return (
    <div
      className="bg-no-repeat bg-contain bg-right-top min-h-screen"
      style={{
        backgroundImage: "url(" + bgImage + ")",
      }}
    >
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
