import { ArrowUpRight, BarChart3, CreditCard, ShoppingBag, Users } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: ShoppingBag,
    title: "Online store",
    description: "Build a polished storefront that makes it easy for customers to discover and buy your products.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Offer a smooth, secure checkout experience with payment options your customers trust.",
  },
  {
    icon: BarChart3,
    title: "Business growth",
    description: "Use clear insights and practical tools to find opportunities and grow your sales.",
  },
  {
    icon: Users,
    title: "Customer relationships",
    description: "Bring customer details together and create experiences that keep people coming back.",
  },
];

function Solution() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <p className="section-label">A BETTER WAY TO SELL</p>
        <h1>One platform. <span>Every possibility.</span></h1>
        <p>Bring your store, payments, customers, and growth tools together in one place.</p>
      </section>
      <section className="page-card-grid">
        {solutions.map(({ icon: Icon, title, description }) => (
          <article className="info-card" key={title}>
            <span className="info-card-icon"><Icon size={24} /></span>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to="/resources">Explore resources <ArrowUpRight size={16} /></Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Solution;