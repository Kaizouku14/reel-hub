import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { SearchInput } from '../components';

const Header = () => {

  return (
    <header className="w-full h-20 flex items-center  px-4 sm:px-6 ">
      <img src="logo.png"
        alt="reel-hub-logo"
        className="h-12 sm:h-16 max-md:h-12"
      />
      <SearchInput/>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
     </Avatar>
    </header>
  );
};

export default Header