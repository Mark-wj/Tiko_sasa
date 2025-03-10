import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BannerCarousel from "../components/Carousel";
import HotelsCard from "../components/HotelsCard";
import MovieCard from "../components/MovieCrad";
import EventsCard from "../components/EventsCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [events, setEvents] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accounts/movies/")
    .then((res) => res.json())
    .then((data) => {
      
      setMovies(data.slice(0,4));
    })
    .catch((err) => console.error("Error fetching movies:", err));
  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accounts/events/")
    .then((res) => res.json())
    .then((data) => {
      // Assuming data is an array, take the first 4 movies:
      const latestEvents = data.slice(-4)
      setEvents(latestEvents);
    })
    .catch((err) => console.error("Error fetching movies:", err));
  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accounts/hotels/")
    .then((res) => res.json())
    .then((data) => {
      // Assuming data is an array, take the first 4 movies:
      setHotels(data.slice(0, 4));
    })
    .catch((err) => console.error("Error fetching movies:", err));
  }, [])
  

    return ( 
      <div>
        <BannerCarousel />
        <div>
        <div className="w-full max-w-7xl mr-[28%] ml-[5%]">
          <div className="flex items-center justify-between">
            <h2 className="text-rose-400 font-extrabold text-3xl">
              Trending Events
            </h2>
            {/* Remove the ml-[80%] since justify-between already spaces the two items */}
            <a href="/events">
            <button className="px-4 hover:text-rose-400 text-3xl">
              View more &gt;
            </button>
            </a>
          </div>
          {/* Instead of using extra flex wrappers and left margins,
              use the grid directly and let the container’s width center it */}
          <Link to="/register">
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div key={event.id}>
                <EventsCard
                  title={event.title}
                  venue={event.venue}
                  date={event.date}
                  price={event.price}
                  image={event.image}
                />
              </div>
            ))}
          </div>
            </Link>
        </div>
        </div>
        <div className="mt-10">
           <div className="flex items-center justify-between ml-24 mr-24">
             <h2 className="text-rose-400 font-extrabold text-3xl">Trending Movies</h2>
             <a href="/movies">
             <button className="px-4 text-3xl hover:text-rose-400">
               View more &gt;
             </button>
             </a>
           </div>

          <Link to="/register">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ml-24 mr-20">
                {movies.map((movie) => (
                 <div key={movie.id}>
                     <MovieCard 
                       title={movie.title}
                       genre={movie.genre}
                       rating={movie.rating}
                       poster={movie.poster}
                       price={movie.price}
                       date={movie.date}
                     />
                 </div>  
                ))}
           </div>
          </Link>
        </div>
        <div className="">
        <div className="mt-10">
          <div className="flex items-center justify-between mr-24 ml-24">
          <h2 className="text-rose-400 font-extrabold text-3xl">Trending Hotels</h2>
          <a href="/hotels">
          <button className="px-4 hover:text-rose-400 text-3xl">View more {'>'}</button>
          </a>
          </div>
          <Link to="/register">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 ml-24 mr-24">
                {hotels.map((hotel) => (
                    <HotelsCard
                      key={hotel.id}
                      name={hotel.name}
                      address={hotel.address}
                      price={hotel.price}
                      rating={hotel.rating}
                      image={hotel.image}
                      />
                ))}
            </div>
          </Link>
        </div>
        </div>
      </div>
     );
}
 
export default Home;