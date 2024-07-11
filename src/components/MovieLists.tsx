import { FC } from "react";
import {  ScrollArea , ScrollBar   } from "../components/ui/scroll-area";
import { MoviePoster } from "../interface/Movie";

interface Category {
  movieList : MoviePoster[];
}

export const MovieLists:FC<Category> = ({ movieList }) => {
 
  return (
    <ScrollArea className="flex w-full space-x-2 whitespace-nowrap">
            <div className="flex w-max space-x-4 p-4">
                {movieList.length > 0 && (
                    movieList.map((movie, index) => (
                        <div key={index} className="flex flex-col items-center rounded-xl w-36 mx-1">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt="Movie Poster"
                            className="cursor-pointer rounded-xl hover:border-2 h-48 w-36 object-cover"
                        />
                        <span className="text-[0.75rem] text-white mt-2 text-wrap ">{movie.original_title}</span>
                        </div>
                    ))
                )}
            </div>
        <ScrollBar 
        orientation="horizontal"
        />
    </ScrollArea>
  )
}

export default MovieLists