import React, { useState } from 'react';
import { useQuery } from 'react-query';
import MovieGrid from '../components/MovieGrid';
import options_API from '../config';

const fetchMovies = async (searchTerm) => {
    const url = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}`
        : 'https://api.themoviedb.org/3/movie/now_playing';
    
    const response = await fetch(url, options_API);

    if (!response.ok) {
        throw new Error('Erreur réseau')
    }

    return response.json();
};

const MovieList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isError, isLoading, error } = useQuery(['movies', searchTerm], () => fetchMovies(searchTerm), {
        keepPreviousData: true, 
        staleTime: 5000, 
        refetchOnWindowFocus: false
    });

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
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {error.message}</div>}
            {data && <MovieGrid movies={data.results} />}
        </div>
    );
};

export default MovieList;
