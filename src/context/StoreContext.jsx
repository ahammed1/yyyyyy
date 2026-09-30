import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { StoreContext } from "./StoreContext.js";

const TOKEN_KEY = "shop_access_token";
const USER_KEY = "shop_user";

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function StoreProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [sessionReady, setSessionReady] = useState(
    () => !localStorage.getItem(TOKEN_KEY) || !readUser(),
  );
  const [cart, setCart] = useState({ items: [], itemCount: 0, total: 0, currency: "INR" });
  const [cartError, setCartError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    if (!readUser()) {
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
    const controller = new AbortController();
    api("/auth/me", { signal: controller.signal })
      .then((profile) => {
        setUser(profile);
        localStorage.setItem(USER_KEY, JSON.stringify(profile));
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        if (error.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setUser(null);
          setSessionReady(true);
        } else {
          console.error("Could not restore account session:", error);
        }
      })
      .finally(() => setSessionReady(true));
    return () => controller.abort();
  }, []);

  const refreshCart = async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setCart({ items: [], itemCount: 0, total: 0, currency: "INR" });
      setCartError("");
      return;
    }
    try {
      setCart(await api("/cart"));
      setCartError("");
    } catch (error) {
      setCartError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (!sessionReady || !user) return;
    api("/cart")
      .then((nextCart) => {
        setCart(nextCart);
        setCartError("");
      })
      .catch((error) => {
        setCartError(error.message);
        console.error("Could not load cart:", error);
      });
  }, [user, sessionReady]);

  const signIn = async (credentials, isRegister) => {
    const result = await api(isRegister ? "/auth/register" : "/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    localStorage.setItem(TOKEN_KEY, result.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    setUser(result.user);
    setSessionReady(true);
    setCart({ items: [], itemCount: 0, total: 0, currency: "INR" });
    setCartError("");
    return result.user;
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setCart({ items: [], itemCount: 0, total: 0, currency: "INR" });
  };

  const setCartItem = async (productId, quantity) => {
    const nextCart = await api("/cart/items", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    });
    setCart(nextCart);
    setCartError("");
    return nextCart;
  };

  return (
    <StoreContext.Provider value={{ user, cart, cartError, signIn, signOut, refreshCart, setCartItem }}>
      {children}
    </StoreContext.Provider>
  );
}
