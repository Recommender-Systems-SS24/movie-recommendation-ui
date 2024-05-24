import React, { useEffect, useState } from 'react';
import { getRecommendations, likeMovie } from '../services/api';
import { Movie } from '../types/Movie';

const Recommendations: React.FC<{ userId: string }> = ({ userId }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const movies = await getRecommendations(userId);
            setRecommendations(movies);
        };

        fetchRecommendations();
    }, [userId]);

    const handleLike = async (movieId: string) => {
        await likeMovie(userId, movieId);
        const movies = await getRecommendations(userId);
        setRecommendations(movies);
    };

    return (
        <div>
            <h2>Recommendations</h2>
            <ul>
                {recommendations.map((movie: any) => (
                    <li key={movie.id}>
                        {movie.title}
                        <button onClick={() => handleLike(movie.id)}>Like</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;
