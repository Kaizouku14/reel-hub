import axios from "axios";

export const queryPopularMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

export const queryNowPlayingMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

export const queryUpComingMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

export const querySearchedMovie = async (querySearch : string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${querySearch}&api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}
