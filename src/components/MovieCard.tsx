import { FC } from "react";
import { MovieDetails } from "../interface/MovieDetails";


interface CardProps {
    clickCard : (movie : MovieDetails) => void;
    data : MovieDetails;
}

export const MovieCard:FC<CardProps> = ({ clickCard, data }) => {
  return (
    <div className="w-36 max-md:border-b max-md:border-gray-400 max-md:w-full max-md:inline-block max-md:py-4"
        onClick={() => clickCard(data)}
        >
        <div className="flex flex-col max-md:flex-row">
            <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt="Movie Poster"
            className="cursor-pointer rounded-xl hover:border-2 h-48 w-36 object-cover max-md:h-24 max-md:w-24"
            />
            <span className="text-[0.75rem] text-white mt-2 text-center max-md:text-base max-md:ml-4">
            {data.original_title}
            <span className="hidden max-md:block text-gray-500 text-sm text-start">
                {data.release_date}
            </span>
            </span>
        </div>
    </div>
  )
}
