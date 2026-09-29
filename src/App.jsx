import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Home from "./pages/home.jsx";
import Solution from "./pages/solution.jsx";
import Pricing from "./pages/pricing.jsx";
import Resources from "./pages/resources.jsx";
import Login from "./pages/login.jsx";
import "./App.css";

function AppRoutes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">
      <nav className="navbar">
        <NavLink to="/" className="logo" onClick={closeMenu} end>
          YYYYYY
        </NavLink>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink
            to="/solutions"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Solutions <ChevronDown size={16} />
          </NavLink>

          <NavLink
            to="/pricing"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
            end
          >
            Pricing
          </NavLink>

          <NavLink
            to="/resources"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Resources <ChevronDown size={16} />
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Enterprise
          </NavLink>
        </div>

        <div className="nav-actions">
          <NavLink to="/login" className="login" onClick={closeMenu}>
            Log in
          </NavLink>

          <NavLink to="/pricing" className="start-btn" onClick={closeMenu}>
            Start free trial
          </NavLink>
        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solution />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
