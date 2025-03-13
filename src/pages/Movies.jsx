import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCrad";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("title");

  useEffect(() => {
    fetch("https://tiko-sasa-backend-production.up.railway.app/api/accounts/movies/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Movies");
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    let updatedMovies = [...movies];

    if (searchQuery.trim() !== "") {
      updatedMovies = updatedMovies.filter((movie) => {
        const value = movie[filterKey]?.toString().toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    if (sortBy !== "") {
      updatedMovies.sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        } else if (sortBy === "date") {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
    }

    setFilteredMovies(updatedMovies);
  }, [searchQuery, filterKey, sortBy, movies]);

  return (
    <div className="max-w-[96%] mx-auto px-6 py-10">
      {/* Search Bar */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex w-full max-w-md">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by title, genre, rating, price or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="genre">Genre</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar: Sort Options and Ads */}
        <aside className="w-full lg:w-1/4 space-y-6">
          <div className="p-4 border border-gray-200 rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Sort Movies
            </h2>
            <div>
              <label className="block mb-2 text-gray-600">Sort by:</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">None</option>
                <option value="price">Price</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>

          {/* Ads Section */}
          <div className="p-4 border border-gray-200 rounded-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Highly Anticipated Releases
            </h2>
            <div className="space-y-4">
              <img
                src="https://tinyurl.com/6tsfvnwh"
                alt="Ad Space 1"
                className="w-[360px] h-[540px] object-cover"
              />
              <img
                src="https://tinyurl.com/2nh3wazk"
                alt="Ad Space 2"
                className="w-[360px] h-[540px] object-cover"
              />
            </div>
          </div>
        </aside>

        {/* Movies Grid */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <MovieCard
                title={movie.title}
                genre={movie.genre}
                rating={movie.rating}
                poster={movie.poster}
                price={movie.price}
                date={movie.date}
              />
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Movies;
