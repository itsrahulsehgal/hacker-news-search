import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

const SearchResults = ({ results }) => {
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
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
