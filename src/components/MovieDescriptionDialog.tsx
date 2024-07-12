import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { MovieInfo } from "../interface/Movie";

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`h-[450px] bg-cover bg-center border-none`}
       style={{
            backgroundImage: backgroundImage ? backgroundImage : undefined,
            backgroundColor: backgroundImage ? undefined : 'rgb(2 6 23)',
        }}
       >
        <DialogHeader>
          <DialogTitle className="text-white">{movieDetails?.original_title}</DialogTitle>
          <DialogDescription className="text-white">
            {movieDetails?.overview}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
