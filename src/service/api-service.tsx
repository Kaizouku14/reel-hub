import axios from "axios";

export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

export const fetchNowPlayingMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

export const fetchUpComingMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

export const fetchSearchedMovie = async (querySearch : string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${querySearch}&api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}


export const queryVideos = async (querySearch : string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${querySearch}&api_key=${import.meta.env.VITE_API_KEY}`);

        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export const fetchMovieVideo = async (movie_id : number | undefined):Promise<string | undefined> => {
    try {
        if(!movie_id) return;

        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`);
        
        const { videos } = response.data;
        
        // Check if there are videos available
        if (videos && videos.results && videos.results.length > 0) {
          const trailers = videos.results.filter((video: { type: string; }) => video.type === 'Trailer');
          const keys = trailers.map((video: { key: string; }) => video.key);

          return keys[0];
        } else {
          return;
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
}