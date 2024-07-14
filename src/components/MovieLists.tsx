import { FC, useState } from "react";
import {  ScrollArea , ScrollBar   } from "../components/ui/scroll-area";
import { MovieDescriptionDialog } from "./MovieDescriptionDialog";
import { MovieDetails } from "../interface/MovieDetails";


export const MovieLists:FC<{ movieList : MovieDetails[]; }> = ({ movieList }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const handleClickedMovie = (movie: MovieDetails) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMovie(null);
  };
 
  return (
    <>
      <ScrollArea className="flex w-full space-x-2 whitespace-nowrap">
             <div className="flex w-max space-x-4 p-4">
                  {movieList.length > 0 && (
                    movieList.map((movie, index) => (
                      <div key={index} className="flex flex-col items-center rounded-xl w-36 mx-1"
                        onClick={() => handleClickedMovie(movie)}
                        >
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
          <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {selectedMovie && (
        <MovieDescriptionDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          movie={selectedMovie}
        />
      )}
    </>
  )
}

export default MovieLists