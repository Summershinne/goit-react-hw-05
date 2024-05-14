import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";
const api_read_access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzUwODg0MmE4NzhiMmRlMDU1NGEyZDRkMDc5YzBkMSIsInN1YiI6IjY2M2ZiMjc3MzQwZTlhOWE3ZTM2NTk4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IK3II0eD48M7MlwZmxt9K1dh8O8XKccsTX1IC5lQ7y8";
const API_KEY = "a7508842a878b2de0554a2d4d079c0d1";

const options = {
    method: 'GET',
  headers: {
    Authorization: `Bearer ${api_read_access_token}`
  }
};

export const fetchTrendingMovies = async (currentPage) => {
    try {
        const response = await axios.get(`/3/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`, options);
        return response.data.results;
    }
    catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};
export const fetchSearchMovie = async (page, query) => {
    try {
        const response = await axios.get('/3/search/movie', {
            params: {
                api_key: API_KEY,
                page: page,
                query: query,
            },   
            ...options
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const fetchMovieById = async (id) => {
    try {
        const response = await axios.get(`3/movie/${id}?api_key=${API_KEY}`, options);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching movie by ID:', error);
        throw error;
    }
};

export const fetchMovieCreditsById = async (id) => {
    try {
        const response = await axios.get(`3/movie/${id}/credits?api_key=${API_KEY}`, options);
        return response.data.cast;
    }
    catch (error) {
        console.error('Error fetching movie cast by ID:', error);
        throw error;
    }
};

export const fetchMovieRevievsById = async (id) => {
    try {
        const response = await axios.get(`/3/movie/${id}/reviews?api_key=${API_KEY}`, options);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movie cast by ID:', error);
        throw error;
    }
};