import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/elements/Navbar";
import AppContext from "../src/components/Context/userContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import NotFoundPage from "./components/pages/NotFoundPage";
import useStore from "./Store/useStore";

function App() {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [allSaveByUser, setAllSaveByUser] = useState();
  const [newTab, setNewTab] = useState();
  const [newWorkspace, setNewWorksapce] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
    async function getUser() {
      try {
        if (!token) {
          return;
        }
        const decoded = jwt_decode(token);
        console.table('just for netlify test',decoded)
        const res = await axios.get(``);
        setCurrentUser(...res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [token, setCurrentUser]);

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

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        allSaveByUser,
        setAllSaveByUser,
        newWorkspace,
        setNewWorksapce,
        newTab,
        setNewTab,
      }}
    >
      <BrowserRouter>
        {currentUser?.id ? <Navbar /> : <div></div>}
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/signIn" element={<SignIn />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/work" element={<Home />} />
          <Route exact path="/leisure" element={<Home />} />
          <Route exact path="/hobbies" element={<Home />} />
          <Route exact path="/education" element={<Home />} />
          <Route path="/404" component={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
