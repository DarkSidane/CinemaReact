import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie-list-vite/movie/:movieId" element={<MovieDetail />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
