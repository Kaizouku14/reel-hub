import { Search } from "lucide-react";
import { FC, FormEvent, useState } from "react"
import { SearchResultModal } from "./SearchResult";


export const SearchInput:FC = () => {
  const [isFocused, setIsFocused] = useState(false);


  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <form className="relative flex justify-center" onSubmit={handleOnSubmit}>
      <input className="w-32 sm:w-58 md:w-72 lg:w-80 py-2 px-3 bg-gray-700 border-gray-700 border-2 text-white rounded-full text-sm outline-none transition-width duration-300 ease-in-out max-md:w-24"
        type="text"
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400'
        size={21}
      />
      <SearchResultModal isOnFocus={isFocused} searchResult="" />
    </form>
  )
}

