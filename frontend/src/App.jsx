import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AllWorkouts from "./pages/AllWorkouts";
import Calories from "./pages/Calories";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AppContextProvider from "./context/AppContextProvider";

function App() {
  const token = localStorage.getItem("token")
  return (
    <>
      <BrowserRouter>
        <AppContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/all" element={ <AllWorkouts />} />
            <Route path="/new" element={<Calories />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <ToastContainer />
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
