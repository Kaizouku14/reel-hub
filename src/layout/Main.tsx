import {  ScrollArea , ScrollBar   } from "../components/ui/scroll-area";

const Main = () => {
  const movies = [
    { id: 1, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 2, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 3, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 4, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 5, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 6, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 7, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 8, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 6, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 7, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 8, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 6, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 7, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 8, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 6, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 7, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 8, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 6, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 7, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
    { id: 8, title: 'Hit Man', imgSrc: 'movi-poster.jpg' },
  ];


  return (
    <main className="h-[585px] flex flex-col p-3 gap-y-2">

        <section className="p-4 h-76 flex flex-col gap-y-3 text-white ">
           <span className="text-lg max-md:text-base font-bold">Continue Watching</span>

            <ScrollArea className="flex w-full space-x-2 whitespace-nowrap">
              <div className="flex w-max space-x-4 p-4">
                  {movies.map((movie) => (
                    <div key={movie.id} className="flex flex-col items-center rounded-xl w-36 mx-1">
                      <img
                        src={movie.imgSrc}
                        alt="Movie Poster"
                        className="cursor-pointer rounded-xl hover:border-2 h-48 w-36 object-cover"
                      />
                      <span className="text-base text-white mt-2 ">{movie.title}</span>
                    </div>
                  ))}
              </div>
               <ScrollBar className="hidden max-md:block"
                 orientation="horizontal"  />
            </ScrollArea>

        </section>


    </main>
  )
}

export default Main