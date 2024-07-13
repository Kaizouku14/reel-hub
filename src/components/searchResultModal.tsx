import { Search , X} from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { querySearchedMovie } from "../service/api-service";
import { MovieDetails } from "../interface/MovieDetails";
import { MovieDescriptionDialog } from "./MovieDescriptionDialog";

interface SearchProps {
    onClose : () => void;
}

export const SearchResultModal:FC<SearchProps> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState<string>(''); 
  const [searchResult, setSearchResult] = useState<MovieDetails[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  
  useEffect (() => {
    const handleKeyDown = (event : KeyboardEvent) => {
      const key = event.key;
      if(key === 'Escape') onClose();
    }
     document.addEventListener('keydown', handleKeyDown);
        
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[onClose]) 

  const handleSearch = async (e : ChangeEvent<HTMLInputElement>) => {
    const querySearch = e.target.value;
  

     if(querySearch){
      setSearchValue(querySearch);

      await querySearchedMovie(searchValue)
        .then((res) => setSearchResult(res))
        .catch((err) => {
          console.error(err);
          setSearchResult([]);
         })
     }else{
       setSearchResult([])
     }
  } 
  
  const handleClickMovie = (movie : MovieDetails) => {
      setSelectedMovie(movie);
      setDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMovie(null);
  };
 

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 text-white flex items-center justify-center z-50">
          <div className="w-11/12 max-w-3xl bg-gray-800 p-4 md:rounded-lg shadow-lg h-[400px] max-md:h-full max-md:w-full">

          <div className="flex items-center justify-between border-b border-gray-500 p-2 text-[0.80rem]">
            <div className="flex items-center">
              <Search className='mr-2 text-slate-400'size={22}/>
              <input className="py-2 px-3 outline-none bg-transparent w-[500px] max-md:w-72"
                  type="text" placeholder="Search Movie" 
                  onChange={handleSearch}
                />
            </div>
              <button className="font-medium bg-slate-700 p-1 rounded text-[0.70rem] shadow-lg max-md:hidden"
              onClick={() => onClose()}
              >ESC</button>
              <button className="hidden text-slate-400 max-md:block hover:text-slate-600"
              onClick={() => onClose()}
              ><X/>
              </button>
          </div> 

          <div className="h-80 grid grid-cols-4 overflow-y-auto p-4 gap-4 max-md:h-full max-md:grid-cols-1 max-md:gap-4">
            {searchResult.length > 0 && (
                searchResult.map((movie, index) => (
                  <div
                    key={index}
                    className="w-36 max-md:border-b max-md:border-gray-400 max-md:w-full max-md:inline-block max-md:py-4"
                    onClick={() => handleClickMovie(movie)}
                  >
                    <div className="flex flex-col max-md:flex-row">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt="Movie Poster"
                        className="cursor-pointer rounded-xl hover:border-2 h-48 w-36 object-cover max-md:h-24 max-md:w-24"
                      />
                      <span className="text-[0.75rem] text-white mt-2 text-center max-md:text-base max-md:ml-4">
                        {movie.original_title}
                        <span className="hidden max-md:block text-gray-500 text-sm text-start">
                         {movie.release_date}
                        </span>
                      </span>
                     
                    </div>
                  </div>
                ))
              )}
          </div>

          </div>
      </div>

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
