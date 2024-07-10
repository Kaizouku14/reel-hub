import { Search, X } from 'lucide-react'; 
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [history, setHistory] = useState([]);

  return (
    <header className="w-full h-20 flex items-center justify-between px-4 sm:px-6">
      <img src="logo.png"
        alt="reel-hub-logo"
        className="h-12 sm:h-16 max-md:h-12"
      />
      <div className="relative flex justify-center">
        <input
          className="w-32 sm:w-56 md:w-72 lg:w-80 py-2 px-3 bg-gray-700 border-gray-700 border-2 text-white rounded-full text-sm outline-none transition-width duration-300 ease-in-out max-md:w-24"
          type="text"
          placeholder="Search"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        <Search
          className={`${!isSearchFocused ? 'block' : 'hidden'} absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400`}
          size={21}
        />
        <X
          className={`${isSearchFocused ? 'block' : 'hidden'} absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-500 cursor-pointer`}
          size={21}
        />

        <div className={`${history.length > 0 ? 'flex' : 'hidden'} absolute md:w-[290px] h-52 rounded bg-slate-800 flex-col top-12 md:top-[2.75rem] py-2 px-2 shadow-lg gap-y-1 max-md:hidden`}>
           <span className='text-[0.65rem] text-slate-200 text-end font-'>Recent searched</span>
          <div className="flex justify-between items-center text-sm py-2 text-slate-400 border-b border-slate-400">
            Jurassic Park
            <X className="hover:text-slate-500 cursor-pointer" size={20} />
          </div>
          {/* Add more search results here */}
        </div>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
     </Avatar>
    </header>
  );
};

export default Header