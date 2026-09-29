import { ArrowUpRight, BookOpen, Compass, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const resources = [
  {
    icon: BookOpen,
    type: "GUIDE",
    title: "Launch your online store",
    description: "A practical guide to taking your first steps, from choosing products to opening your doors.",
  },
  {
    icon: GraduationCap,
    type: "LEARNING",
    title: "Build your business skills",
    description: "Explore useful lessons on marketing, customer experience, and running an online business.",
  },
  {
    icon: Compass,
    type: "INSPIRATION",
    title: "Find your next big idea",
    description: "Discover fresh ideas and proven approaches to help your business move forward.",
  },
];

function Resources() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <p className="section-label">LEARN, BUILD, GROW</p>
        <h1>Helpful ideas for <span>what’s next.</span></h1>
        <p>Guides and learning resources to help you make progress at every stage of your business.</p>
      </section>
      <section className="page-card-grid">
        {resources.map(({ icon: Icon, type, title, description }) => (
          <article className="info-card resource-card" key={title}>
            <span className="resource-type">{type}</span>
            <span className="info-card-icon"><Icon size={24} /></span>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to="/solutions">Explore topic <ArrowUpRight size={16} /></Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Resources;
