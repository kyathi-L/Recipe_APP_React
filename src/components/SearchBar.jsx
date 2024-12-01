import React from 'react';

function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search for recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search value on change
      />
    </div>
  );
}

export default SearchBar;
