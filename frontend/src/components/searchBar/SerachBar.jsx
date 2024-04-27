const SearchBar = ({ id, setSearch }) => {
  return (
    <>
      <input
        placeholder="Search..."
        id={id}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </>
  );
};

export default SearchBar;
