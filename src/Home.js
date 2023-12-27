// Home.js
import React from 'react';
import Search from './Search';
import { auth } from './firebase';
import SearchResults from './SearchResults';
import { Link } from 'react-router-dom';
import './App.css'; // Make sure to import your CSS file

const Home = ({ onSearchResults, searchResults }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="home-container">
      <header className="header-box">
        <div className="navbar">
          <Search onSearchResults={onSearchResults} />

          <div className="nav-links">
            <Link to="/favorites" className="nav-link">
              Go to Favorites
            </Link>
            <button className="nav-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <SearchResults results={searchResults} />
    </div>
  );
};

export default Home;