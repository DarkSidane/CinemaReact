import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = () => {
	const { movieId } = useParams();

	
	const [movie, setMovie] = useState(null);
	const [credits, setCredits] = useState(null);
	const [images, setImages] = useState(null);

	
	useEffect(() => {
		
		const fetchMovieDetail = async () => {
			try {
				const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`, {
					headers: {
						'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTY3OTRlMDU1ZjRiMDA0OWVkYjAwNzYwNmU3YTJiMCIsInN1YiI6IjY1NGE1MDM3MWFjMjkyN2IyZjI3MjgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zh5RQtn5g1oHuAfOyZmiNqBgPdAp5MWxY3jYPoJdjqM'
					}
				});
				const movieData = await movieResponse.json();
				setMovie(movieData); 
				const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
					headers: {
						'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTY3OTRlMDU1ZjRiMDA0OWVkYjAwNzYwNmU3YTJiMCIsInN1YiI6IjY1NGE1MDM3MWFjMjkyN2IyZjI3MjgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zh5RQtn5g1oHuAfOyZmiNqBgPdAp5MWxY3jYPoJdjqM'
					}
				});
				const creditsData = await creditsResponse.json();
				setCredits(creditsData); 
				const imagesResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
					headers: {
						'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTY3OTRlMDU1ZjRiMDA0OWVkYjAwNzYwNmU3YTJiMCIsInN1YiI6IjY1NGE1MDM3MWFjMjkyN2IyZjI3MjgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zh5RQtn5g1oHuAfOyZmiNqBgPdAp5MWxY3jYPoJdjqM'
					}
				});
				const imagesData = await imagesResponse.json();
				setImages(imagesData); 
			} catch (error) {
				
				console.error('Erreur lors de la requête : ', error);
			}
		};

		fetchMovieDetail(); 
	}, [movieId]); 
	if (!movie || !credits) {
		return <div className="flex justify-center items-center h-screen">Chargement...</div>;
	}
	const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '';
	const backUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';
	return (
	<div className={`min-h-screen bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(${backUrl})`, backgroundAttachment: 'fixed' }}>
		<div className="absolute top-0 right-0 bottom-0 left-0 bg-black/30 backdrop-blur-xl"></div>
		<div className="relative p-4 flex flex-col items-start">
			<Link to="/" className="inline-block px-4 py-2 rounded-full text-left text-white mb-4">
			← Retour
			</Link>
			<div className="flex flex-col md:flex-row md:items-end mb-10">
				{posterUrl && <img className="rounded-lg shadow-lg object-cover mb-4 md:mb-0" src={posterUrl} alt={movie.title} width="300" />}
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
			<h1 className="text-4xl text-white">Crédits</h1>
			<div className="w-full overflow-x-auto whitespace-nowrap">
				{credits.cast.map((member) => (
				<div className="inline-block p-2" key={member.id}>
					<img 
				     src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} 
				     alt={member.name} 
				     className="mb-2 rounded shadow" 
				     />
					<div className="text-left">
						<p className="text-white text-lg">{member.name}</p>
						<p className="text-gray-400 text-sm">{member.character}</p>
					</div>
				</div>
				))}
			</div>
			<h1 className="text-4xl text-white">Images</h1>
			<div className="w-full overflow-x-auto whitespace-nowrap">
				{images && images.backdrops && images.backdrops.map((image, index) => (
				image.file_path && (
				<div className="inline-block p-2" key={index}>
					<img 
				     src={`https://image.tmdb.org/t/p/original${image.file_path}`} 
				     alt={`${movie.title} backdrop`} 
				     className="rounded shadow w-[1200px]" 
				     />
				</div>
				)
				))}
			</div>
		</div>
	</div>
	);
};
export default MovieDetail;
