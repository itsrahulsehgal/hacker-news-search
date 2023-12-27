// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { auth } from './firebase';
import PostDetail from './PostDetail';
import Favorites from './Favorites';
const App = () => {
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setCurrentComponent(user ? <Home onSearchResults={handleSearchResults} searchResults={searchResults} /> : <SignIn onSignInSuccess={handleSignInSuccess} />);
    });

    return () => unsubscribe();
  }, [searchResults]);

  const handleSignInSuccess = () => {
    setUser(auth.currentUser);
    setCurrentComponent(<Home onSearchResults={handleSearchResults} searchResults={searchResults} />);
  };
  const handleSignUpSuccess = () => {
    setUser(auth.currentUser);
    setCurrentComponent(<Home onSearchResults={handleSearchResults} searchResults={searchResults} />);
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Hacker News Search</h1>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={currentComponent}
            />
            <Route path="/signin" element={<SignIn onSignInSuccess={handleSignInSuccess} />} />
            <Route path="/signup" element={<SignUp onSignUpSuccess={handleSignUpSuccess} />} />
            <Route path="/post/:objectId" element={<PostDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            {/* <Route
              path="/home"
              element={
                user ? (
                  <Home onSearchResults={handleSearchResults} searchResults={searchResults} />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
