import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api, formatPrice } from "../lib/api";
import { useStore } from "../context/useStore.js";

const emptyProduct = {
  name: "", sku: "", category: "", description: "", price: "", stock: "", image: "",
};
const nextOrderStatus = {
  PAID: "PROCESSING",
  PROCESSING: "SHIPPED",
  SHIPPED: "DELIVERED",
};
const fetchAdminData = () => Promise.all([
  api("/products"),
  api("/orders/admin/all"),
]);

function AdminPage() {
  const { user } = useStore();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (user?.role !== "ADMIN") return;
    let active = true;
    fetchAdminData()
      .then(([nextProducts, nextOrders]) => {
        if (!active) return;
        setProducts(nextProducts);
        setOrders(nextOrders);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });
    return () => {
      active = false;
    };
  }, [user?.id, user?.role]);

  const loadAdminData = async () => {
    const [nextProducts, nextOrders] = await fetchAdminData();
    setProducts(nextProducts);
    setOrders(nextOrders);
  };

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/shop" replace />;

  const saveProduct = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
    };
    try {
      await api(editingId ? `/products/${editingId}` : "/products", {
        method: editingId ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      setProductForm(emptyProduct);
      setEditingId(null);
      await loadAdminData();
      setNotice(editingId ? "Product updated." : "Product created.");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setProductForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const archiveProduct = async (product) => {
    if (!window.confirm(`Archive ${product.name}?`)) return;
    setError("");
    setNotice("");
    try {
      await api(`/products/${product.id}`, { method: "DELETE" });
      await loadAdminData();
      setNotice("Product archived.");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    setError("");
    setNotice("");
    try {
      await api(`/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await loadAdminData();
      setNotice("Order status updated.");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const setField = (event) => setProductForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  return (
    <main className="storefront-page admin-page">
      <header className="storefront-heading"><p className="section-label">STORE MANAGEMENT</p><h1>Admin <span>dashboard.</span></h1></header>
      {error && <p className="store-message store-error" role="alert">{error}</p>}
      {notice && <p className="store-message" role="status">{notice}</p>}

      <section className="admin-section">
        <h2>{editingId ? "Edit product" : "Add a product"}</h2>
        <form className="admin-product-form" onSubmit={saveProduct}>
          <label>Product name<input name="name" value={productForm.name} onChange={setField} required minLength="2" maxLength="120" /></label>
          <label>SKU<input name="sku" value={productForm.sku} onChange={setField} required minLength="2" maxLength="40" /></label>
          <label>Category<input name="category" value={productForm.category} onChange={setField} required minLength="2" maxLength="120" /></label>
          <label>Price (₹)<input name="price" type="number" min="1" step="1" value={productForm.price} onChange={setField} required /></label>
          <label>Stock<input name="stock" type="number" min="0" value={productForm.stock} onChange={setField} required /></label>
          <label>Image / emoji<input name="image" value={productForm.image} onChange={setField} maxLength="500" /></label>
          <label className="admin-wide-field">Description<textarea name="description" value={productForm.description} onChange={setField} minLength="5" maxLength="2000" required rows="3" /></label>
          <div className="admin-form-actions">
            <button className="store-button" type="submit">{editingId ? "Save changes" : "Add product"}</button>
            {editingId && <button className="secondary-button" type="button" onClick={() => { setEditingId(null); setProductForm(emptyProduct); }}>Cancel edit</button>}
          </div>
        </form>
      </section>

      <section className="admin-section">
        <h2>Products <span className="admin-count">{products.length}</span></h2>
        <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>{products.map((product) => (
            <tr key={product.id}>
              <td>{product.image} {product.name}</td><td>{product.sku}</td><td>{formatPrice(product.price)}</td><td>{product.stock}</td>
              <td><button className="text-button" onClick={() => editProduct(product)}>Edit</button><button className="text-button danger-link" onClick={() => archiveProduct(product)}>Archive</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      </section>

      <section className="admin-section">
        <h2>Orders <span className="admin-count">{orders.length}</span></h2>
        <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Update</th></tr></thead>
          <tbody>{orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td><td>{order.user.name}<br />{order.user.email}</td><td>{new Date(order.createdAt).toLocaleDateString()}</td><td>{formatPrice(order.total)}</td><td>{order.status}</td>
              <td>{nextOrderStatus[order.status] ? (
                <button className="text-button" onClick={() => updateOrderStatus(order.id, nextOrderStatus[order.status])}>
                  Mark {nextOrderStatus[order.status].toLowerCase()}
                </button>
              ) : "—"}</td>
            </tr>
          ))}</tbody>
        </table>{!orders.length && <p className="store-message">No orders yet.</p>}</div>
      </section>
    </main>
  );
}

export default AdminPage;
