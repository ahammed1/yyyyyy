import { Link } from "react-router-dom";
import { formatPrice } from "../lib/api";

function ProductCard({ product }) {
  return (
    <article className="catalog-card">
      <Link className="catalog-image" to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
        <span>{product.image || "🛍️"}</span>
      </Link>
      <div className="catalog-card-info">
        <p className="catalog-category">{product.category}</p>
        <h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
        <p className="catalog-description">{product.description}</p>
        <div className="catalog-card-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <span>{product.stock > 0 ? "In stock" : "Sold out"}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
