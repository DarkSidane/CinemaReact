import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTY3OTRlMDU1ZjRiMDA0OWVkYjAwNzYwNmU3YTJiMCIsInN1YiI6IjY1NGE1MDM3MWFjMjkyN2IyZjI3MjgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zh5RQtn5g1oHuAfOyZmiNqBgPdAp5MWxY3jYPoJdjqM'
          }
        });
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (!movie) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '';
  const backUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';

  return (
    <div className={`min-h-screen bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(${backUrl})`, backgroundAttachment: 'fixed' }}>
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative p-4 flex flex-col items-start">
        <Link to="/" className="inline-block px-4 py-2 rounded-full text-left text-white mb-4">
          ← Back
        </Link>
        <div className="flex flex-col md:flex-row md:items-end">
          {posterUrl && <img className="max-w-sm md:max-w-md h-auto rounded-lg shadow-lg object-cover mb-4 md:mb-0" src={posterUrl} alt={movie.title} width="300" />}
          <div className="text-white p-4 rounded-lg text-left">
            <h1 className="text-4xl">{movie.title}</h1>
            <p>{movie.overview}</p>
            {movie.genres && (
              <p className="italic text-gray-400">
                {movie.genres.map(genre => genre.name).join(', ')}
              </p>
            )}
            <p className="text-gray-300">{new Date(movie.release_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
