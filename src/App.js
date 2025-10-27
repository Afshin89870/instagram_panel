import { BrowserRouter, Form, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PanelPage from "./pages/PanelPage";
import Login from "./pages/Login";
import { createGlobalStyle } from "styled-components";
import "./app.css";

const GelobalStyle = createGlobalStyle`
  *{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: Vazir;
  }
`;

function App() {
  const [login, setLogin] = useState(
    localStorage.getItem("loggined") === "true"
  );

  useEffect(() => {
    const cheackLoggin = () => {
      const logged = localStorage.getItem("loggined") === "true";
      setLogin(logged);
    };
    const interval = setInterval(cheackLoggin, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <GelobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={login ? <PanelPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={login ? <Navigate to="/" replace /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
