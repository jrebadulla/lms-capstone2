import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import LandingPageDashboard from "./Components/LandingPageDashboard/LandingPageDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<LandingPageDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
