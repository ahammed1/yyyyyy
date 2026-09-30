const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").replace(/\/+$/, "");

export async function api(path, options = {}) {
  const token = localStorage.getItem("shop_access_token");
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch (cause) {
    if (cause.name === "AbortError") throw cause;
    throw new Error(
      `Cannot connect to the backend at ${API_URL}. Start the API and make sure its PostgreSQL database is available.`,
      { cause },
    );
  }

  const data = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message = Array.isArray(data?.message)
      ? data.message.join(", ")
      : data?.message || "The request could not be completed.";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return data;
}

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
