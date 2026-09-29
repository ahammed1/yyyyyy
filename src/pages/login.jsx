import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <p className="section-label">WELCOME BACK</p>
        <h1>Log in to your store</h1>
        <p className="login-intro">Enter your details to continue to your commerce dashboard.</p>
        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
          <button type="submit">Log in <ArrowRight size={17} /></button>
        </form>
        <p className="login-signup">New to the platform? <Link to="/">Start your free trial</Link></p>
      </section>
    </main>
  );
}

export default Login;