import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "₹499",
    description: "Everything you need to launch your first store.",
    features: ["Online store", "Unlimited products", "Secure payments", "Basic analytics"],
  },
  {
    name: "Growth",
    price: "₹1,499",
    description: "Powerful tools for growing businesses.",
    features: ["Everything in Starter", "Advanced analytics", "Marketing tools", "Multiple sales channels"],
    featured: true,
  },
  {
    name: "Scale",
    price: "₹3,999",
    description: "Advanced commerce infrastructure for teams.",
    features: ["Everything in Growth", "Priority support", "Team accounts", "Custom reporting"],
  },
];

function Pricing() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <p className="section-label">SIMPLE, TRANSPARENT PRICING</p>
        <h1>Plans that grow <span>with you.</span></h1>
        <p>Start with the essentials and unlock more powerful tools as your business grows.</p>
      </section>
      <section className="page-pricing-grid" aria-label="Pricing plans">
        {plans.map((plan) => (
          <article className={`page-plan-card${plan.featured ? " page-plan-featured" : ""}`} key={plan.name}>
            {plan.featured && <span className="page-plan-badge">MOST POPULAR</span>}
            <p className="page-plan-eyebrow">FOR YOUR BUSINESS</p>
            <h2>{plan.name}</h2>
            <p className="page-plan-description">{plan.description}</p>
            <p className="page-plan-price">{plan.price}<span>/ month</span></p>
            <Link className="page-plan-button" to="/login">
              Get started <ArrowRight size={17} />
            </Link>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}><Check size={17} /> {feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Pricing;
