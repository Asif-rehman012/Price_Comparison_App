import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/productList";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cheapest, setCheapest] = useState(null);

  const searchProduct = async (query) => {
    const res = await axios.get(
      `http://localhost:5000/api/search?q=${query}`
    );
    setProducts(res.data.products);
    setCheapest(res.data.cheapest);
  };

  return (
    <div>
      <h1 style={{textAlign: "center"}}>🛒 Smart Price Comparison</h1>
      <SearchBar onSearch={searchProduct} />
      <ProductList products={products} cheapest={cheapest} />
      
    </div>
  );
}

export default App;
