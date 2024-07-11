import { X } from "lucide-react"
import { FC } from "react";

interface SearchResult {
    isOnFocus : boolean;
    searchResult : string;
}

export const SearchResultModal:FC<SearchResult> = ({ isOnFocus , searchResult}) => {
  return (
    <div className={`${isOnFocus ? 'absolute' : 'hidden' } z-50 md:w-[290px] h-52 rounded bg-slate-800 flex-col top-12 md:top-[2.75rem] py-2 px-2 shadow-lg gap-y-1 max-md:hidden`}>

        <span className='text-[0.65rem] text-slate-200 text-end'>Searched result</span>
        <div className="flex justify-between items-center text-sm py-2 text-slate-400 border-b border-slate-400">
          Jurassic Park {searchResult}
        <X className="hover:text-slate-500 cursor-pointer" size={20} />
        </div>
        
    </div>
  )
}

