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
    fetch("https://tiko-sasa-backend-production.up.railway.app/api/accounts/movies/", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  useEffect(() => {
    fetch("https://tiko-sasa-backend-production.up.railway.app/api/accounts/events/", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Assuming data is an array, take the last 4 items:
        const latestEvents = data.slice(-4);
        setEvents(latestEvents);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  useEffect(() => {
    fetch("https://tiko-sasa-backend-production.up.railway.app/api/accounts/hotels/", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setHotels(data.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching hotels:", err));
  }, []);

  return ( 
    <div className="overflow-x-hidden">
      <BannerCarousel />
      {/* Events Section */}
      <div className="px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-rose-400 font-extrabold text-xl md:text-2xl lg:text-3xl">
            Trending Events
          </h2>
          <a href="/events">
            <button className="px-2 md:px-4 hover:text-rose-400 text-lg md:text-xl lg:text-2xl">
              View more &gt;
            </button>
          </a>
        </div>
        <Link to="/register">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {events.map((event) => (
              <div key={event.id} className="w-full max-w-[300px] min-w-[250px] h-full">
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

      {/* Movies Section */}
      <div className="mt-8 px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-rose-400 font-extrabold text-xl md:text-2xl lg:text-3xl">
            Trending Movies
          </h2>
          <a href="/movies">
            <button className="px-2 md:px-4 hover:text-rose-400 text-lg md:text-xl lg:text-2xl">
              View more &gt;
            </button>
          </a>
        </div>
        <Link to="/register">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {movies.map((movie) => (
              <div key={movie.id} className="w-full max-w-[300px] min-w-[250px] h-full">
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

      {/* Hotels Section */}
      <div className="mt-8 px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-rose-400 font-extrabold text-xl md:text-2xl lg:text-3xl">
            Trending Hotels
          </h2>
          <a href="/hotels">
            <button className="px-2 md:px-4 hover:text-rose-400 text-lg md:text-xl lg:text-2xl">
              View more &gt;
            </button>
          </a>
        </div>
        <Link to="/register">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="w-full max-w-[300px] min-w-[250px] h-full">
                <HotelsCard
                  name={hotel.name}
                  address={hotel.address}
                  price={hotel.price}
                  rating={hotel.rating}
                  image={hotel.image}
                />
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
}
 
export default Home;
