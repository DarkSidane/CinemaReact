// Importation des composants et hooks nécessaires depuis React.
import React, { useState, useEffect } from 'react';

// Importation du composant MovieGrid depuis les composants locaux.
import MovieGrid from '../components/MovieGrid';

// Composant MovieList pour lister les films.
const MovieList = () => {
	// Utilisation du useState pour gérer les films et le terme de recherche.
	const [movies, setMovies] = useState([]); // Stockage des films.
	const [searchTerm, setSearchTerm] = useState(''); // Stockage du terme de recherche.

	// useEffect pour effectuer des opérations après le rendu du composant.
	useEffect(() => {
		// Fonction asynchrone pour récupérer les films.
		const fetchMovies = async () => {
			// URL par défaut pour obtenir les films actuellement à l'affiche.
			let url = 'https://api.themoviedb.org/3/movie/now_playing';

			// Modification de l'URL si un terme de recherche est présent.
			if (searchTerm) {
				url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}`;
			}

			try {
				// Appel à l'API pour récupérer les films.
				// Utlisation de l'API de Amine Boujemaoui car l'API de The Movie Database ne fonctionne pas.
				const response = await fetch(url, {
					headers: {
					    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTY3OTRlMDU1ZjRiMDA0OWVkYjAwNzYwNmU3YTJiMCIsInN1YiI6IjY1NGE1MDM3MWFjMjkyN2IyZjI3MjgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zh5RQtn5g1oHuAfOyZmiNqBgPdAp5MWxY3jYPoJdjqM'
					}
				});
				const data = await response.json(); // Conversion de la réponse en JSON.
				setMovies(data.results); // Mise à jour de l'état avec les films récupérés.
			} catch (error) {
				// Gestion des erreurs.
				console.error('Failed to fetch movies:', error);
			}
		};

		// Temporisation de l'appel API pour éviter les appels excessifs.
		const timerId = setTimeout(() => {
			fetchMovies();
		}, 500);

		// Fonction de nettoyage pour annuler le temporisateur.
		return () => clearTimeout(timerId);
	}, [searchTerm]); // Le useEffect se déclenche à chaque modification du searchTerm.

	// Gestion de la modification du champ de recherche.
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value); // Mise à jour du terme de recherche.
	};

	// Rendu du composant.
	return (
	<div className="container mx-auto p-8">
		<header className="flex justify-between items-center px-4 md:px-8 pt-4 md:pt-8 pb-8">
			<h1 className="text-4xl">🎬🍿 Movie Library</h1>
			<input
					type="text"
					placeholder="🔎 Search for movie"
					className="rounded-full border-2 border-gray-300 p-2 w-1/3 md:w-1/4 lg:w-1/5"
					onChange={handleSearchChange} // Mise à jour du terme de recherche lors de la saisie.
					/>
		</header>
		<MovieGrid movies={movies} /> {/* Affichage des films dans un grille. */}
	</div>
	);
};

// Exportation du composant MovieList pour utilisation dans d'autres parties de l'application.
export default MovieList;
