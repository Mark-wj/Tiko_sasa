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

  // DRY fetch helper
  const fetchData = async (url, setter, sliceStart = 0, sliceEnd = 4) => {
    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
  
      // Handle negative slice properly
      const slicedData =
        sliceStart < 0 ? data.slice(sliceStart) : data.slice(sliceStart, sliceEnd);
  
      setter(slicedData);
    } catch (err) {
      console.error(`Error fetching from ${url}:`, err);
    }
  };
  
  useEffect(() => {
    fetchData("https://tiko-sasa-backend.onrender.com/api/accounts/movies/", setMovies);
    fetchData("https://tiko-sasa-backend.onrender.com/api/accounts/events/", setEvents, -4); // last 4
    fetchData("https://tiko-sasa-backend.onrender.com/api/accounts/hotels/", setHotels);
  }, []);
  

  return (
    <div className="overflow-x-hidden mt-16">
      <BannerCarousel />

      {/* Events Section */}
      <Section
        title="Trending Events"
        link="/events"
        items={events}
        CardComponent={EventsCard}
        itemProps={(e) => ({
          title: e.title,
          venue: e.venue,
          date: e.date,
          price: e.price,
          image: e.image,
        })}
        path="/events/"
      />

      {/* Movies Section */}
      <Section
        title="Trending Movies"
        link="/movies"
        items={movies}
        CardComponent={MovieCard}
        itemProps={(m) => ({
          title: m.title,
          genre: m.genre,
          rating: m.rating,
          poster: m.poster,
          price: m.price,
          date: m.date,
        })}
        path="/movies/"
      />

      {/* Hotels Section */}
      <Section
        title="Trending Hotels"
        link="/hotels"
        items={hotels}
        CardComponent={HotelsCard}
        itemProps={(h) => ({
          name: h.name,
          address: h.address,
          price: h.price,
          rating: h.rating,
          image: h.image,
        })}
        path="/hotels/"
      />
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, link, items, CardComponent, itemProps, path }) => (
  <div className="mt-8 px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-rose-400 font-extrabold text-xl md:text-2xl lg:text-3xl">
        {title}
      </h2>
      <Link to={link}>
        <button className="px-2 md:px-4 hover:text-rose-400 text-lg md:text-xl lg:text-2xl">
          View more &gt;
        </button>
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
      {items.map((item) => (
        <Link
          key={item.id}
          to={`${path}${item.id}`}
          className="w-full max-w-[300px] min-w-[250px] h-full"
        >
          <CardComponent {...itemProps(item)} />
        </Link>
      ))}
    </div>
  </div>
);

export default Home;
