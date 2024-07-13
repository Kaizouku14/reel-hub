import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { SearchResultModal } from '../components/searchResultModal';
import { Search } from 'lucide-react';
const Header = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <header className="w-full h-20 flex items-center  px-4 sm:px-6 ">
      <img src="logo.png"
        alt="reel-hub-logo"
        className="h-12 sm:h-16 max-md:h-12"
      />
      <div className="relative flex justify-center flex-grow">
        <div className="relative">
          <button className="w-32 sm:w-58 md:w-72 lg:w-80 py-2 px-3 bg-gray-700 border-gray-700 border-2 text-slate-400 rounded-full text-sm outline-none transition-width duration-300 ease-in-out max-md:w-24 text-start "
          onClick={() => setClicked(true)}
          > Search
            <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400'
            size={18}/>
          </button>
          {clicked && 
              <SearchResultModal onClose={() => setClicked(false)}/>
           }     
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