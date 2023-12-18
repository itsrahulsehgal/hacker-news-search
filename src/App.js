import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './Search';
import SearchResults from './SearchResults';
import PostDetail from './PostDetail';
import './App.css'
const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Hacker News Search</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home onSearchResults={handleSearchResults} searchResults={searchResults} />} />
            <Route path="/post/:objectId" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Home = ({ onSearchResults, searchResults }) => (
  <div className="home-container">
    <Search onSearchResults={onSearchResults} />
    <SearchResults results={searchResults} />
  </div>
);


export default App;
