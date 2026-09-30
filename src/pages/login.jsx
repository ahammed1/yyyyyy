import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/useStore.js";

function Login({ register = false }) {
  const [isRegister, setIsRegister] = useState(register);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { signIn } = useStore();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const values = new FormData(event.currentTarget);
    const credentials = {
      email: values.get("email"),
      password: values.get("password"),
    };
    if (isRegister) credentials.name = values.get("name");
    try {
      const user = await signIn(credentials, isRegister);
      navigate(user.role === "ADMIN" ? "/admin" : "/shop");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const toggleMode = () => {
    const nextMode = !isRegister;
    setIsRegister(nextMode);
    navigate(nextMode ? "/register" : "/login");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="section-label">{isRegister ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</p>
        <h1>{isRegister ? "Join the store" : "Log in to your store"}</h1>
        <p className="login-intro">{isRegister ? "Create an account to save your cart and track orders." : "Enter your details to continue to your commerce account."}</p>
        <form className="login-form" onSubmit={submit}>
          {isRegister && <><label htmlFor="login-name">Full name</label><input id="login-name" name="name" autoComplete="name" minLength="2" maxLength="80" required /></>}
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength="8" maxLength="72" placeholder="At least 8 characters" required />
          {error && <p className="store-message store-error" role="alert">{error}</p>}
          <button type="submit" disabled={busy}>{busy ? "Please wait…" : isRegister ? "Create account" : "Log in"} <ArrowRight size={17} /></button>
        </form>
        <p className="login-signup">
          {isRegister ? "Already have an account? " : "New to the platform? "}
          <button type="button" className="text-button" onClick={toggleMode}>{isRegister ? "Log in" : "Create an account"}</button>
        </p>
        <p className="login-signup"><Link to="/shop">Continue shopping</Link></p>
      </section>
    </main>
  );
}

export default Login;
