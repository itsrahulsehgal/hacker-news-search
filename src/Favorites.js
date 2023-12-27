// Favorites.js
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import { Link } from 'react-router-dom';
import './App.css'; // Import your CSS file

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      if (auth.currentUser) {
        const favoritesRef = doc(firestore, 'favorites', auth.currentUser.uid);
        const snapshot = await getDoc(favoritesRef);

        if (snapshot.exists()) {
          setFavorites(snapshot.data().articles);
        }
      }

      setIsLoaded(true);
    };

    loadFavorites();
  }, []);

  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>
      {isLoaded ? (
        <ul className="search-results">
          {favorites.map((article) => (
            <li key={article.objectID} className="search-result-card">
              <Link to={`/post/${article.objectID}`} target="_blank" rel="noopener noreferrer">
                <h3 className="post-title">{article.title}</h3>
              </Link>
              <p className="post-metadata">
                Author: {article.author} | Points: {article.points} | Comments: {article.num_comments}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading favorites...</p>
      )}
    </div>
  );
};

export default Favorites;
