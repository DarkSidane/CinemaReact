import React, { useState, useEffect } from 'react';

// Component to display individual movie cards
const MovieCard = ({ movie }) => {
  // Switching from 'w200' to 'w500' for a higher resolution image
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <a
      href={`https://yourdomain.com/movie-list-vite/movie/${movie.id}`}
      className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="w-full transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        src={imageUrl}
        alt={movie.title}
      />
    </a>
  );
};

const App = () => {
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
    <div className="App bg-gray-200 min-h-screen">
      <header className="flex justify-between items-center px-4 md:px-8 pt-4 md:pt-8">
        <h1 className="text-3xl font-bold text-black">
          🎬🍿 Movie library
        </h1>
        <input
          type="text"
          placeholder="🔎 Search for movie"
          className="rounded-full border-2 border-gray-300 p-2 w-1/3 md:w-1/4 lg:w-1/5"
        />
      </header>
      <main className="px-4 md:px-8 pt-2 pb-4 md:pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
