import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
const Search = ({ onSearchResults }) => {
    const [query, setQuery] = useState('');
  
    const handleSearch = async () => {
      try {
        const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
        onSearchResults(response.data.hits);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    return (
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          placeholder="Search Hacker News..."
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    );
  };
  
  export default Search;
  