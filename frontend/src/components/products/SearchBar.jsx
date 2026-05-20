const SearchBar = ({
  searchTerm,
  setSearchTerm,
}) => {

  return (
    <div className="w-full mb-8">

      <input
        type="text"
        placeholder="Search AI products..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 text-lg"
      />
    </div>
  );
};

export default SearchBar;