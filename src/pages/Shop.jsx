import { useEffect, useState } from "react";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    api(`/products?${params}`, { signal: controller.signal })
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [search, category]);

  const handleSearch = (event) => {
    setLoading(true);
    setSearch(event.target.value);
  };

  const handleCategory = (event) => {
    setLoading(true);
    setCategory(event.target.value);
  };

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <main className="storefront-page">
      <header className="storefront-heading shop-heading">
        <p className="section-label">OUR COLLECTION</p>
        <h1>Shop <span>the collection.</span></h1>
        <p>Discover products made for everyday life.</p>
      </header>
      <div className="catalog-controls">
        <input aria-label="Search products" placeholder="Search products..." value={search} onChange={handleSearch} />
        <select aria-label="Filter by category" value={category} onChange={handleCategory}>
          <option value="">All categories</option>
          {categories.map((value) => <option key={value}>{value}</option>)}
        </select>
      </div>
      {error && <p className="store-message store-error">{error}{!error.status && " Start the API and make sure PostgreSQL is available."}</p>}
      {loading ? <p className="store-message">Loading products…</p> : (
        <section className="catalog-grid" aria-label="Products">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
          {!products.length && !error && <p className="store-message">No products found.</p>}
        </section>
      )}
    </main>
  );
}

export default Shop;
