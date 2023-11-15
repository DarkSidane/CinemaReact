import React from 'react';

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform ease-in-out duration-300">
      <a href={`http://localhost:5173/movie-list-vite/movie/${movie.id}`}>
        <img src={posterUrl} alt={movie.title} className="rounded-lg" />
      </a>
    </div>
  );
};

export default MovieCard;
