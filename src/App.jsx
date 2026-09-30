import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { StoreProvider } from "./context/StoreContext.jsx";
import { useStore } from "./context/useStore.js";
import Home from "./pages/Home.jsx";
import Solution from "./pages/solution.jsx";
import Pricing from "./pages/Pricing.jsx";
import Resources from "./pages/resources.jsx";
import Login from "./pages/login.jsx";
import Shop from "./pages/Shop.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import "./App.css";

function AppRoutes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, cart, signOut } = useStore();
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
          <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
          {user && <NavLink to="/cart" onClick={closeMenu}>Cart ({cart.itemCount})</NavLink>}
          {user && <NavLink to="/orders" onClick={closeMenu}>My orders</NavLink>}
          {user?.role === "ADMIN" && <NavLink to="/admin" onClick={closeMenu}>Admin dashboard</NavLink>}
          {!user && <NavLink to="/login" onClick={closeMenu}>Log in</NavLink>}
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
          <NavLink to="/cart" className="login" onClick={closeMenu}>
            Cart ({cart.itemCount})
          </NavLink>
          {user ? (
            <>
              <NavLink to="/orders" className="login" onClick={closeMenu}>My orders</NavLink>
              {user.role === "ADMIN" && <NavLink to="/admin" className="login" onClick={closeMenu}>Admin</NavLink>}
              <button className="login nav-logout" onClick={() => { signOut(); closeMenu(); }}>Log out</button>
            </>
          ) : (
            <NavLink to="/login" className="login" onClick={closeMenu}>Log in</NavLink>
          )}
          <NavLink to="/shop" className="start-btn" onClick={closeMenu}>Shop now</NavLink>
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
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/register" element={<Login register />} />
        <Route path="/admin" element={<AdminPage />} />
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
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
