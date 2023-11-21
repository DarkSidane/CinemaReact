import React, { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
const MovieList = () => {
	const [movies, setMovies] = useState([]); 
	const [searchTerm, setSearchTerm] = useState(''); 
	useEffect(() => {
		const fetchMovies = async () => {
			let url = 'https://api.themoviedb.org/3/movie/now_playing';
			if (searchTerm) {
				url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}`;
			}
			try {
				const response = await fetch(url, {
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
		const timerId = setTimeout(() => {
			fetchMovies();
		}, 500);
		return () => clearTimeout(timerId);
	}, [searchTerm]); 
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value); 
	};
	return (
	<div className="container mx-auto p-8">
		<header className="flex justify-between items-center px-4 md:px-8 pt-4 md:pt-8 pb-8">
			<h1 className="text-4xl">🎬🍿 Movie Library</h1>
			<input
					type="text"
					placeholder="🔎 Search for movie"
					className="rounded-full border-2 border-gray-300 p-2 w-1/3 md:w-1/4 lg:w-1/5"
					onChange={handleSearchChange} 
					/>
		</header>
		<MovieGrid movies={movies} /> 
	</div>
	);
};
export default MovieList;
