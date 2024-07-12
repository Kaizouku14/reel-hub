import { Search } from "lucide-react";
import { FC, useEffect } from "react";

interface SearchProps {
    searchResult : string;
    onClose : () => void;
}

export const SearchResultModal:FC<SearchProps> = ({ searchResult , onClose}) => {
  console.log(searchResult)
  
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

  return (
   <div className="fixed inset-0 bg-black bg-opacity-75 text-white flex items-center justify-center z-50">
      <div className="w-11/12 max-w-3xl bg-gray-800 p-4 rounded-lg shadow-lg h-[400px]">

        <div className="flex items-center justify-between border-b border-gray-500 p-2 text-[0.80rem]">
          <div className="flex items-center">
            <Search className='mr-2 text-slate-400'size={22}/>
            <input className="py-2 px-3 outline-none bg-transparent w-[500px]"
              type="text" placeholder="Search Movie" />
          </div>
          <button className="font-medium bg-slate-700 p-1 rounded text-[0.70rem] shadow-lg"
           onClick={() => onClose()}
          >ESC</button>
        </div> 

      </div>
   </div>
  )
}

//{searchResult ? searchResult : "No results found"}
{/* <div className={`${isOnFocus ? 'absolute' : 'hidden' } 
     z-50 md:w-[290px] h-52 rounded bg-slate-800 flex-col top-12 md:top-[2.75rem] py-2 px-2 shadow-lg gap-y-1 max-md:hidden`}>

        <span className='text-[0.65rem] text-slate-200 text-end'>Searched result</span>
        <div className="flex justify-between items-center text-sm py-2 text-slate-400 border-b border-slate-400">
          Jurassic Park {searchResult}
        <X className="hover:text-slate-500 cursor-pointer" size={20} />
        </div>
        
    </div> */}