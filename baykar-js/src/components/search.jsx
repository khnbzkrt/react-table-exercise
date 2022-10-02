export const SearchInput = ({ query, setQuery }) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Ara"
        className="h-10 p-3 border outline-0 w-52"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};
