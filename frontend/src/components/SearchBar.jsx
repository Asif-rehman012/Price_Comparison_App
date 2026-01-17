export default function SearchBar({ onSearch }) {
  return (
    <input
      className="search-input"
      placeholder="Search product..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch(e.target.value);
        }
      }}
    />
  );
}
