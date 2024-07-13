import { Search , X} from "lucide-react";
import { ChangeEvent, FC, Suspense, useEffect, useState } from "react";
import { querySearchedMovie } from "../service/api-service";
import { MovieDetails } from "../interface/MovieDetails";


interface SearchProps {
    onClose : () => void;
}

export const SearchResultModal:FC<SearchProps> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState<string>(''); 
  const [searchResult, setSearchResult] = useState<MovieDetails[]>([]);
  
  useEffect (() => {
    const handleKeyDown = (event : KeyboardEvent) => {
      const key = event.key;
      if(key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
        
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[onClose]) 

  const handleSearch = (e : ChangeEvent<HTMLInputElement>) => {
    const querySearch = e.target.value;

     if(querySearch){
        setSearchValue(querySearch);

       querySearchedMovie(searchValue)
        .then((res) => console.log(res))
        .catch((err) => {
           if(err){
             setSearchResult([])
           }
         })
     }else{
       setSearchResult([])
     }
  } 

  const Loading = () => {
     return (
        <>
          <p> No results for : {searchValue} </p>
        </>
     )
  }

  
  return (
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

        <div className="h-80 flex justify-center items-center">
            <Suspense fallback={ <Loading/> }>
              <div className="h-full w-full flex">
                    {searchResult.length > 0 && (
                        searchResult.map((movie, index) => (
                          <div key={index} className="flex flex-col items-center rounded-xl w-36 mx-1"
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
            </Suspense>   
        </div>

      </div>
   </div>
  )
}

