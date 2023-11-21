import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie-list-vite/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
