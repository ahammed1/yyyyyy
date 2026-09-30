import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, formatPrice } from "../lib/api";
import { useStore } from "../context/useStore.js";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, cart, setCartItem } = useStore();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/products/${id}`).then(setProduct).catch((requestError) => setError(requestError.message));
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setBusy(true);
    setNotice("");
    try {
      const currentItem = cart.items.find((item) => item.productId === product.id);
      await setCartItem(product.id, (currentItem?.quantity ?? 0) + 1);
      setNotice("Added to your cart.");
    } catch (requestError) {
      setNotice(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  if (error) return <main className="storefront-page"><p className="store-message store-error">{error}</p><Link to="/shop">Back to shop</Link></main>;
  if (!product) return <main className="storefront-page"><p className="store-message">Loading product…</p></main>;

  return (
    <main className="storefront-page">
      <Link className="back-link" to="/shop">← Back to shop</Link>
      <article className="product-detail">
        <div className="product-detail-image">{product.image || "🛍️"}</div>
        <div className="product-detail-copy">
          <p className="catalog-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong className="product-detail-price">{formatPrice(product.price)}</strong>
          <p>{product.stock > 0 ? `${product.stock} in stock` : "Currently sold out"}</p>
          <button className="store-button" type="button" onClick={addToCart} disabled={busy || product.stock < 1}>
            {busy ? "Adding…" : "Add to cart"}
          </button>
          {notice && <p className="store-message">{notice}</p>}
        </div>
      </article>
    </main>
  );
}

export default ProductPage;
