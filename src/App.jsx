import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './pages/MovieList'; // Assuming MovieList is stored inside the 'pages' folder
import MovieDetail from './pages/MovieDetail'; // Assuming MovieDetail is stored inside the 'pages' folder
import './App.css'; // Import the App CSS file for styling

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
