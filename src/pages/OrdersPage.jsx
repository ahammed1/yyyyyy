import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, formatPrice } from "../lib/api";
import { useStore } from "../context/useStore.js";

function OrdersPage() {
  const { user } = useStore();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) api("/orders").then(setOrders).catch((requestError) => setError(requestError.message));
  }, [user]);

  if (!user) return <main className="storefront-page"><header className="storefront-heading"><h1>Your orders</h1><p>Log in to view your orders.</p><Link className="store-button" to="/login">Log in</Link></header></main>;
  return (
    <main className="storefront-page">
      <header className="storefront-heading"><p className="section-label">ACCOUNT</p><h1>Your <span>orders.</span></h1></header>
      {error && <p className="store-message store-error">{error}</p>}
      {!orders.length && !error ? <div className="empty-state"><p>No orders yet.</p><Link className="store-button" to="/shop">Shop now</Link></div> : (
        <section className="order-list">{orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-card-heading"><strong>Order {order.id}</strong><span className={`status-pill status-${order.status.toLowerCase()}`}>{order.status}</span></div>
            <p>{new Date(order.createdAt).toLocaleDateString()} · {formatPrice(order.total)}</p>
            <ul>{order.items.map((item) => <li key={item.id}>{item.name} × {item.quantity}</li>)}</ul>
          </article>
        ))}</section>
      )}
    </main>
  );
}

export default OrdersPage;
