import React, { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid'; // Ensure that you have a MovieGrid component

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTY3OTRlMDU1ZjRiMDA0OWVkYjAwNzYwNmU3YTJiMCIsInN1YiI6IjY1NGE1MDM3MWFjMjkyN2IyZjI3MjgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zh5RQtn5g1oHuAfOyZmiNqBgPdAp5MWxY3jYPoJdjqM'
          }
        });
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl mb-8">🎬🍿 Movie Library</h1>
      <MovieGrid movies={movies} /> {/* This line uses the MovieGrid component */}
    </div>
  );
};

export default MovieList;
