import { useState } from "react";
import style from "./SearchForm.module.css";

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
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        className={style.input}
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter the name of the movie"
        required
      />
      <button className={style.btn} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
