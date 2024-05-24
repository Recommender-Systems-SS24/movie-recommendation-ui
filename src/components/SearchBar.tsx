import React, { useState } from 'react';
import { searchMovies } from '../services/api';
import { Movie } from '../types/Movie';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);

    const handleSearch = async () => {
        const movies = await searchMovies(query);
        setMovies(movies);
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {movies.map((movie: Movie) => (
                    <li key={movie.MovieID}>{movie.Title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
