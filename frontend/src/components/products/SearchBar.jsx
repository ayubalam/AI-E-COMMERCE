const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="w-full mb-8">
      
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-slate-300 px-5 py-4 rounded-2xl outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;