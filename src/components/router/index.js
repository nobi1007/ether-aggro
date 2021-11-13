import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Aggregator from "../../pages/aggregator";
import Dashboard from "../../pages/dashboard";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/aggregator" element={<Aggregator />} />
            </Routes>
        </Router>
    );
}
