import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "../App";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />}>
            <Route path="about" element={<About />}>

            <Route path="dashboard" element={<Dashboard>/}>
                <Route index element={<Home />}>
                <Route path="settings" element={<Settings />}>
            </Route>

        </Routes>
    </BrowserRouter>
)