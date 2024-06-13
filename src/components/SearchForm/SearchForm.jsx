import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="searchInput">
        Enter the name of the movie:
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="For example, 'Star Wars'"
          required
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
