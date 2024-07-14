import { FC } from "react";

interface TrailePlayer {
    trailerUrl : string;
}

export const MovieTrailerPlayer:FC<TrailePlayer> = ({ trailerUrl }) => {

    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            {trailerUrl && (
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
  };