import { useEffect, useState } from "react";
import { queryPopularMovies, queryNowPlayingMovies , queryUpComingMovies } from "../service/api-service";
import MovieLists from "../components/MovieLists";
import { MovieInfo } from "../interface/Movie";

const Main = () => {
  const [popularMovies, setPopularMovies] = useState<MovieInfo[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieInfo[]>([]);
  const [upComingMovies, setUpComingMovies] = useState<MovieInfo[]>([]);

  useEffect(() => {
   
    queryPopularMovies()
       .then(res => setPopularMovies(res))
       .catch(error => console.log(error))

    queryNowPlayingMovies()
        .then(res => setNowPlayingMovies(res))
        .catch(error => console.log(error))

    queryUpComingMovies()
       .then(res => setUpComingMovies(res))
       .catch(error => console.log(error))

  }, [])

  return (
    <main className="h-full flex flex-col p-3">
        <section className="p-4 h-76 flex flex-col gap-y-3 text-white ">
           <span className="text-lg max-md:text-base font-bold">Now Playing</span>
           <MovieLists movieList={nowPlayingMovies} />
        </section>

        <section className="p-4 h-76 flex flex-col gap-y-3 text-white">
           <span className="text-lg max-md:text-base font-bold">Popular</span>
           <MovieLists movieList={popularMovies} />
        </section>
    
        <section className="p-4 h-76 flex flex-col gap-y-2 text-white">
           <span className="text-lg max-md:text-base font-bold">Up Coming </span>
           <MovieLists movieList={upComingMovies} />
        </section>
    </main>

    
  )
}

export default Main