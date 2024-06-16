import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const searchMovies = async (query: string) => {
    const response = await axios.get(`${API_URL}/search`, { params: { query } });
    return response.data;
};

export const getMovieDetails = async (movieID: string) => {
    const response = await axios.get(`${API_URL}/details`, { params: { movieID } });
    return response.data;
};

export const getSimilarMovies = async (movieID: string, listNr: number) => {
    const response = await axios.get(`${API_URL}/recommend`, { params: { movieID, listNr } });
    return response.data;
};

export const getMoviePosterURL = (movieID: string): string => {
    return `${API_URL}/poster?movieID=${movieID}`;
};
