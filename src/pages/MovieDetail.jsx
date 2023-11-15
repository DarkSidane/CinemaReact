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
    return <div>Loading...</div>;
  }

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '';
  const backUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';

  return (
    <div style={{ backgroundImage: `url(${backUrl})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <div style={{position: 'relative', padding: '1rem'}}>
        <Link to="/" className="inline-block p-4 bg-gray-300 rounded-full">
          ← Back
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posterUrl && <img className="max-w-full h-auto rounded-lg" src={posterUrl} alt={movie.title} />}
          <div className="text-container" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '20px', padding: '20px' }}>
            <h1 className="text-4xl text-white">{movie.title}</h1>
            <p className="text-white">{movie.overview}</p>
            {movie.genres && (
              <p className="italic text-gray-400">
                {movie.genres.map(genre => genre.name).join(', ')}
              </p>
            )}
            <p className="text-gray-300">{new Date(movie.release_date).toLocaleDateString()}</p>
          </div>
        </div>
        {/* Credits and additional high-resolution images not included */}
      </div>
    </div>
  );
};

export default MovieDetail;
