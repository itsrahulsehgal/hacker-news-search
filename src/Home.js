import React from 'react';
import Search from './Search';
import SearchResults from './SearchResults';
import { auth } from './firebase';

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
      <div className="header">
        <div className="flex-container">
          <Search onSearchResults={onSearchResults} />
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default Home;
