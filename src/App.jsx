import React, { useState, useEffect } from 'react';

// Component to display individual movie cards
const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; // Use w200 for smaller images

  return (
    <a
      href={`https://yourdomain.com/movie-list-vite/movie/${movie.id}`}
      className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="w-full h-auto transform transition-transform duration-300 ease-in-out group-hover:scale-110"
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
    <div className="App">
      <header className="bg-gray-800 p-4 md:p-8 text-white text-3xl font-bold text-center">
        🎬🍿 Movie library
      </header>
      <main className="p-4 md:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
