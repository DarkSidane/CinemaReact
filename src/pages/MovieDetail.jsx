import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
   useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=en-US`, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTY3OTRlMDU1ZjRiMDA0OWVkYjAwNzYwNmU3YTJiMCIsInN1YiI6IjY1NGE1MDM3MWFjMjkyN2IyZjI3MjgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zh5RQtn5g1oHuAfOyZmiNqBgPdAp5MWxY3jYPoJdjqM'
          }
        });
        const data = await response.json();
        setMovie(data);
        setCredits(data.credits); // Adjust according to your API response
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder-image-url';
  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : 'placeholder-backdrop-url';

  return (
    <main style={{ backgroundImage: `url(${backdropUrl})` }} className="flex min-h-screen min-w-full bg-cover ">
      <div className="flex-1 flex flex-col gap-4 backdrop-blur-2xl bg-slate-800/40 p-6 lg:p-12 overflow-hidden">
        <Link to="/" className="self-start transition ease-in-out text-white flex gap-1 items-center hover:-translate-x-2">
          {/* Icon and Back button */}
        </Link>
        <div className="flex flex-col items-center flex-wrap gap-4 justify-center sm:flex-row sm:items-end">
          <img className="rounded-md object-cover" src={posterUrl} alt={movie.title} width="300" />
          <div className="flex flex-col flex-1">
            <p className="text-4xl w-auto text-white">{movie.title}</p>
            <p className="text-md w-auto text-white">{movie.overview}</p>
            {/* Other movie details like genres and release date */}
          </div>
        </div>
        <div>
          <p className="text-3xl text-white">Credits</p>
          <div className="flex gap-6 pt-2 overflow-x-scroll">
            {/* Credits images and names */}
          </div>
        </div>
        {/* Images section if needed */}
      </div>
    </main>
  );
};

export default MovieDetail;
