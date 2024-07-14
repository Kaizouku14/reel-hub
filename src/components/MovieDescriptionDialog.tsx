import { FC, useEffect, useState } from "react";
import { Clapperboard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { MovieDetails } from "../interface/MovieDetails";
import { getGenreNames } from "../utils/helper";
import { Description } from "@radix-ui/react-dialog";
import { fetchMovieVideo } from "../service/api-service";
import { MovieTrailerPlayer } from "./MovieTrailerPlayer";


interface DialogProps {
  open: boolean;
  onClose: () => void;
  movie?: MovieDetails;
}

export const MovieDescriptionDialog: FC<DialogProps> = ({ open, onClose, movie }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [trailerURL, setTrailerURL] = useState<string | undefined>('');
  const [openVideo, setOpenVideo] = useState(false);

  useEffect(() => {
    if (movie) {
      setMovieDetails(movie);
    }
  }, [movie]);

  const handleTrailerButton = async () => {
    await fetchMovieVideo(movie?.id)
      .then(res => {
        setTrailerURL(res)
        setOpenVideo(true);
      })
      .catch(err => console.log(err))
  }

  const backgroundImage = movieDetails
  ? `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
  : null;

  const genreNames = movieDetails ? getGenreNames(movieDetails?.genre_ids) : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className='h-[450px] bg-cover bg-center border-none bg-blend-darken max-md:w-[350px] rounded'
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
            <ul className="flex text-md font-semibold max-md:justify-center list-none p-0 m-0">
              <li>{movieDetails?.release_date}</li>
              <li className="mx-3">|</li>
              <li>{movieDetails?.vote_average.toFixed(1)}</li>
              <li className="mx-3">|</li>
              <li>{movieDetails?.original_language}</li>
            </ul>
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
            <Description className="h-[180px] max-h-56 overflow-auto"> 
              <span className="text-slate-300 font-bold text-md">SUMMARY</span><br/>
              <span className="text-white text-[0.80rem]">{movieDetails?.overview}</span>
            </Description>
            <div className="flex justify-end max-md:justify-center">
              <button className="w-[150px] text-[0.90rem] text-white bg-slate-800 py-2 px-4 rounded-full  flex items-center justify-between hover:bg-slate-900 active:bg-slate-950 transition-all"
               onClick={handleTrailerButton}
               >
                <Clapperboard size={20} />
                <span>Watch Trailer</span>
              </button>
              {openVideo && trailerURL && (
                <MovieTrailerPlayer trailerUrl={trailerURL}/>
               )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};