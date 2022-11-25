import React from "react";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import NotFound from "./components/notFound";
import Dashboard from "./layout/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/verifyEmail/welcomeScreen";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/welcome-screen" element={<WelcomeScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
