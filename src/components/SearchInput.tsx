import { Search } from "lucide-react";
import { FC, useState } from "react"
import { SearchResultModal } from "./searchResultModal";


export const SearchInput:FC = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative flex justify-center flex-grow">
      <div className="relative">
        <button className="w-32 sm:w-58 md:w-72 lg:w-80 py-2 px-3 bg-gray-700 border-gray-700 border-2 text-white rounded-full text-sm outline-none transition-width duration-300 ease-in-out max-md:w-24 text-start"
        onClick={() => setClicked(true)}
        > Search Movie
          <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400'
          size={21}/>
        </button>
      </div>

      {clicked && 
        <SearchResultModal searchResult="" onClose={() => setClicked(false)}/>
      }
    </div>
  )
}

