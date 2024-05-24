import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const searchMovies = async (query: string) => {
    const response = await axios.get(`${API_URL}/search`, { params: { query } });
    return response.data;
};

export const likeMovie = async (userId: string, movieId: string) => {
    await axios.post(`${API_URL}/like`, { user_id: userId, movie_id: movieId });
};

export const getRecommendations = async (userId: string) => {
    const response = await axios.get(`${API_URL}/recommend`, { params: { user_id: userId } });
    return response.data;
};
