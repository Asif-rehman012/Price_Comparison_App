export const fetchProducts = async (query) => {
  const res = await fetch(
    `http://localhost:5000/api/search?q=${query}`
  );

  return res.json();
};
