import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../lib/api";
import { useStore } from "../context/useStore.js";

function CartPage() {
  const { user, cart, cartError, setCartItem } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const updateQuantity = async (productId, quantity) => {
    setError("");
    try {
      await setCartItem(productId, quantity);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  if (!user) {
    return <main className="storefront-page"><header className="storefront-heading"><h1>Your cart</h1><p>Sign in to view your saved cart.</p><Link className="store-button" to="/login">Log in</Link></header></main>;
  }

  return (
    <main className="storefront-page">
      <header className="storefront-heading"><p className="section-label">YOUR BAG</p><h1>Your <span>cart.</span></h1></header>
      {(error || cartError) && <p className="store-message store-error">{error || cartError}</p>}
      {!cart.items.length ? (
        <div className="empty-state"><p>Your cart is empty.</p><Link className="store-button" to="/shop">Browse products</Link></div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Cart items">
            {cart.items.map((item) => (
              <article className="cart-item" key={item.productId}>
                <span className="cart-item-image">{item.image || "🛍️"}</span>
                <div className="cart-item-info"><h2>{item.name}</h2><p>{formatPrice(item.price)} each</p></div>
                <div className="quantity-control">
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label={`Increase ${item.name} quantity`} disabled={item.quantity >= item.stock} onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
                <strong>{formatPrice(item.lineTotal)}</strong>
              </article>
            ))}
          </section>
          <aside className="cart-summary"><h2>Order summary</h2><p><span>Items ({cart.itemCount})</span><strong>{formatPrice(cart.total)}</strong></p><p className="cart-total"><span>Total</span><strong>{formatPrice(cart.total)}</strong></p><button className="store-button" onClick={() => navigate("/checkout")}>Continue to checkout</button></aside>
        </div>
      )}
    </main>
  );
}

export default CartPage;
