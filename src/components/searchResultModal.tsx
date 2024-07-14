import { Search , X} from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { fetchSearchedMovie } from "../service/api-service";
import { MovieDetails } from "../interface/MovieDetails";
import { MovieDescriptionDialog } from "./MovieDescriptionDialog";
import { MovieCard } from "./MovieCard";


interface SearchProps {
    onClose : () => void;
}

export const SearchResultModal:FC<SearchProps> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState<string>(''); 
  const [searchResult, setSearchResult] = useState<MovieDetails[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [history, setHistory] = useState<MovieDetails[]>(() => {
    const storedHistory = localStorage.getItem('history');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
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

      await fetchSearchedMovie(searchValue)
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

      if (!history.some((item) => item.id === movie.id)) {
        setHistory(prevHistory => [...prevHistory, movie]);
        localStorage.setItem('history', JSON.stringify([...history, movie]));
      }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMovie(null);
  };
 
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('history');
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

          <div className={`h-80 grid overflow-y-auto py-4 px-2 gap-4 max-md:h-full max-md:grid-cols-1 max-md:gap-4
          ${searchResult.length > 0 ? 'grid-cols-4' : '' }`}>
            {searchResult.length > 0 ? (
                searchResult.map((movie, index) => (
                  <MovieCard key={index} clickCard={() => handleClickMovie(movie)} data={movie} />
                ))
              ) : (
                <div className="flex flex-col h-full w-full">
                   <div className="flex justify-between ">
                      <p className="max-md:text-[0.66rem] text-gray-400">Recently Searched</p>
                      <button className="hover:underline text-[0.80rem] text-blue-600 max-md:text-[0.65rem]"
                       onClick={clearHistory}
                      >Clear history</button>
                   </div>
                   <div className={`h-64 flex gap-4 items-center ${history.length > 0 ? '' : 'justify-center'}
                   max-md:flex-col`}>         
                    {history.length > 0 ? (
                      history.map((movie, index) => (
                        <MovieCard key={index} clickCard={() => handleClickMovie(movie)} data={movie}/>
                      ))
                    ): (
                      <p>No Recent History</p>
                    )}
                   </div>
                </div>
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
