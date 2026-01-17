import ProductCard from "./productCard";

export default function ProductList({ products, cheapest }) {
  return (
    <div className="grid">
      {products.map((p, i) => (
        <ProductCard
          key={i}
          product={p}
          isCheapest={cheapest?.price === p.price}
        />
      ))}
    </div>
  );
}
