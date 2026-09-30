import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, formatPrice } from "../lib/api";
import { useStore } from "../context/useStore.js";

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutPage() {
  const { user, cart, refreshCart } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const shippingAddress = Object.fromEntries(
      ["name", "email", "phone", "line1", "city", "state", "postalCode"]
        .map((field) => [field, form.get(field)]),
    );
    try {
      const ready = await loadRazorpay();
      if (!ready) throw new Error("Could not load Razorpay Checkout. Check your internet connection and try again.");

      const order = await api("/orders/checkout", {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
      });
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "AURA Commerce",
        description: "Store order",
        order_id: order.paymentOrderId,
        prefill: { name: shippingAddress.name, email: shippingAddress.email, contact: shippingAddress.phone },
        handler: async (payment) => {
          try {
            await api("/orders/verify-payment", {
              method: "POST",
              body: JSON.stringify({
                razorpayOrderId: payment.razorpay_order_id,
                razorpayPaymentId: payment.razorpay_payment_id,
                razorpaySignature: payment.razorpay_signature,
              }),
            });
            await refreshCart();
            navigate("/orders", { replace: true });
          } catch (verificationError) {
            setError(`Payment verification failed: ${verificationError.message}. Contact support with order ${order.orderId}.`);
            setBusy(false);
          }
        },
        modal: { ondismiss: () => setBusy(false) },
        theme: { color: "#7434b2" },
      });
      checkout.on("payment.failed", (payment) => {
        setError(payment.error?.description || "Payment failed. Your order remains pending.");
        setBusy(false);
      });
      checkout.open();
    } catch (requestError) {
      setError(requestError.message);
      setBusy(false);
    }
  };

  if (!user) return <main className="storefront-page"><header className="storefront-heading"><h1>Checkout</h1><p>Log in before checking out.</p><Link className="store-button" to="/login">Log in</Link></header></main>;
  if (!cart.items.length) return <main className="storefront-page"><div className="empty-state"><h1>Your cart is empty.</h1><Link className="store-button" to="/shop">Browse products</Link></div></main>;

  return (
    <main className="storefront-page">
      <header className="storefront-heading"><p className="section-label">SECURE CHECKOUT</p><h1>Delivery <span>details.</span></h1></header>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit}>
          <label>Full name<input name="name" autoComplete="name" defaultValue={user.name} required maxLength="200" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" defaultValue={user.email} required maxLength="200" /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" required maxLength="20" /></label>
          <label>Address<input name="line1" autoComplete="street-address" required maxLength="200" /></label>
          <div className="checkout-field-row">
            <label>City<input name="city" autoComplete="address-level2" required maxLength="100" /></label>
            <label>State<input name="state" autoComplete="address-level1" required maxLength="100" /></label>
          </div>
          <label>Postal code<input name="postalCode" autoComplete="postal-code" required maxLength="20" /></label>
          {error && <p className="store-message store-error" role="alert">{error}</p>}
          <button className="store-button" type="submit" disabled={busy}>{busy ? "Opening secure checkout…" : `Pay ${formatPrice(cart.total)}`}</button>
          <p className="checkout-note">Payments are securely processed by Razorpay.</p>
        </form>
        <aside className="cart-summary"><h2>Order summary</h2>{cart.items.map((item) => <p key={item.productId}><span>{item.name} × {item.quantity}</span><strong>{formatPrice(item.lineTotal)}</strong></p>)}<p className="cart-total"><span>Total</span><strong>{formatPrice(cart.total)}</strong></p></aside>
      </div>
    </main>
  );
}

export default CheckoutPage;
