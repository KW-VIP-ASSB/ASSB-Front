// src/main.jsx
import React from "react";
import "../index.css";

import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyFolder from "../pages/MyFolder";

const root = createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="folder" element={<MyFolder />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  </HashRouter>
);
