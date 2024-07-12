import { FC, useEffect, useState } from "react";
import { CirclePlay , Clapperboard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { MovieInfo } from "../interface/Movie";
import { getGenreNames } from "../utils/helper";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  movie?: MovieInfo;
}

export const MovieDescriptionDialog: FC<DialogProps> = ({ open, onClose, movie }) => {
  const [movieDetails, setMovieDetails] = useState<MovieInfo | null>(null);

  useEffect(() => {
    if (movie) {
      setMovieDetails(movie);
    }
  }, [movie]);

  const backgroundImage = movieDetails
  ? `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
  : null;

  const genreNames = movieDetails ? getGenreNames(movieDetails?.genre_ids) : [];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className='h-[450px] bg-cover bg-center border-none bg-blend-darken max-md:w-[350px] rounded transition-width duration-300 ease-in-out
            max-md:h-[480px]'
        style={{
          backgroundImage: backgroundImage ? backgroundImage : 'black',
          backgroundColor: backgroundImage ? 'rgba(2, 6, 23, 0.4)' : 'transparent',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-white font-bold text-2xl px-2 max-sm:text-[0.90rem]">
            {movieDetails?.original_title}
          </DialogTitle>
          <div className="flex flex-col pt-4 gap-y-5 text-white max-md:text-center">
            <div className="flex text-md font-semibold max-md:justify-center">
              <span>{movieDetails?.release_date}</span>
              <span className="mx-3">|</span>
              <span>{movieDetails?.vote_average.toFixed(1)}</span>
              <span className="mx-3">|</span>
              <span>{movieDetails?.original_language}</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-slate-300 font-bold text-md">GENRES</span>
              <div className="flex flex-wrap gap-2 max-md:justify-center">
                {genreNames.map((genre, index) => (
                  <div key={index} className="bg-slate-700 py-1 px-3 rounded-full text-[0.70rem]">
                    {genre}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[180px] max-h-56 overflow-auto"> 
              <span className="text-slate-300 font-bold text-md">SUMMARY</span>
              <div className="text-white text-[0.80rem]">{movieDetails?.overview}</div>
            </div>
            <div className="flex justify-end gap-x-3">
              <button className="w-[150px] text-[0.90rem] text-white bg-slate-800 py-2 px-4 rounded-full flex items-center justify-between hover:bg-slate-900 active:bg-slate-950 transition-all">
                <Clapperboard size={20} />
                <span>Watch Trailer</span>
              </button>
              <button className="w-[150px] text-[0.90rem] text-white bg-slate-800 py-2 px-4 rounded-full flex items-center justify-between hover:bg-slate-900 active:bg-slate-950 transition-all">
                <CirclePlay size={22} />
                <span>Watch Movie</span>
              </button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};