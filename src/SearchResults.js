// SearchResults.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToFavorites } from './firebase';
import './App.css';

const SearchResults = ({ results }) => {
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = (article) => {
    addToFavorites(article);
    setFavorites((prevFavorites) => [...prevFavorites, article.objectID]);
  };

  const isFavorite = (objectId) => favorites.includes(objectId);

  return (
    <ul className="search-results">
      {results.map((result) => (
        <li key={result.objectID}>
          <Link to={`/post/${result.objectID}`} target="_blank" rel="noopener noreferrer">
            <h3 className="post-title">{result.title}</h3>
          </Link>
          <p className="post-metadata">
            Points: {result.points} | Author: {result.author} | Comments: {result.num_comments}
          </p>
          <button
            className={`favorite-button ${isFavorite(result.objectID) ? 'favorited' : ''}`}
            onClick={() => handleAddToFavorites(result)}
          >
            ❤
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
