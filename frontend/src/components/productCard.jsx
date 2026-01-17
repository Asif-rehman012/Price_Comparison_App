export default function ProductCard({ product, isCheapest }) {
  const addToWishlist = () => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    list.push(product);
    localStorage.setItem("wishlist", JSON.stringify(list));
    alert("Added to Wishlist");
  };

  const handleBuy = () => {
    if (!product.link) {
      alert("Product link not available");
      return;
    }
    window.open(product.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card">
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
        />
      )}

      <h3>{product.title}</h3>

      <p><b>Platform:</b> {product.platform}</p>

      <p className="price">₹{product.price}</p>

      <p><b>Delivery:</b> {product.delivery}</p>

      {isCheapest && (
        <span className="best-deal">🔥 Best Deal</span>
      )}

      <div className="card-actions">
        <button className="buy-btn" onClick={handleBuy}>
          Buy
        </button>

        <button style={{marginLeft:8}} className="wishlist-btn" onClick={addToWishlist}>
          ❤️ Wishlist
        </button>
      </div>
    </div>
  );
}
