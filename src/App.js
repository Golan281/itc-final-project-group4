import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./components/pages/Home";
import Navbar from "./components/elements/Navbar";
import AppContext from "../src/components/Context/userContext";
import axios from "axios";
import jwt_decode from "jwt-decode";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  const [allSaveByUser, setAllSaveByUser] = useState();
  const [newTab, setNewTab] = useState();
  const [newWorkspace, setNewWorksapce] = useState();

  useEffect(() => {
    async function getUser() {
      try {
        if (!token) {
          return;
        }
        const decoded = jwt_decode(token);
        const res = await axios.get(``);
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getUserWorkSpace() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.get(``, {
          headers: headersConfig,
        });

        setAllSaveByUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserWorkSpace();
  });

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allSaveByUser,
        setAllSaveByUser,
        newWorkspace,
        setNewWorksapce,
        newTab,
        setNewTab,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
