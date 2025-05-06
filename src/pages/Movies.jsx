import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCrad";
import { FiSearch, FiFilter, FiSliders, FiX, FiStar } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("title");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      filterMovies();
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, filterKey, sortBy, priceRange, ratingFilter]);

  const filterMovies = () => {
    let updatedMovies = [...movies];

    // Price filter
    updatedMovies = updatedMovies.filter(
      (movie) => movie.price >= priceRange[0] && movie.price <= priceRange[1]
    );

    // Rating filter
    if (ratingFilter > 0) {
      updatedMovies = updatedMovies.filter(
        (movie) => movie.rating >= ratingFilter
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      updatedMovies = updatedMovies.filter((movie) => {
        const value = movie[filterKey]?.toString().toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    // Sorting
    if (sortBy) {
      updatedMovies.sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "-price") return b.price - a.price;
        if (sortBy === "date") return new Date(a.date) - new Date(b.date);
        if (sortBy === "-date") return new Date(b.date) - new Date(a.date);
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
    }

    setFilteredMovies(updatedMovies);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://tiko-sasa-backend.onrender.com/api/accounts/movies/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
        const maxPrice = Math.max(...data.map((m) => m.price));
        setPriceRange([0, maxPrice]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} height={480} className="rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        ⚠️ Error loading movies: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-20 px-4 text-white">
       {/* Background Image & Overlay */}
       <div className="absolute inset-0">
         <img
           src="https://tinyurl.com/4bzh4tyj"      
           alt="Now Showing background"
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black opacity-50" />
       </div>
     
       {/* Content */}
       <div className="relative max-w-7xl mx-auto text-center">
         <h1 className="text-4xl md:text-6xl font-bold mb-6">
           Now Showing
         </h1>
         <div className="relative max-w-2xl mx-auto">
           <div className="flex items-center bg-white rounded-full shadow-lg">
             <FiSearch className="ml-4 text-gray-400" size={24} />
             <input
               type="text"
               className="w-full py-4 px-4 rounded-full focus:outline-none text-gray-800"
               placeholder="Search movies by title, genre, or actor..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <button
               onClick={() => setIsFiltersOpen(!isFiltersOpen)}
               className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
             >
               <FiFilter className="text-gray-600" size={24} />
             </button>
           </div>
         </div>
       </div>
     </div>


      {/* Filters Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 transform 
        ${isFiltersOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform ease-in-out duration-300`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Filters</h2>
            <button
              onClick={() => setIsFiltersOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>KES {priceRange[0]}</span>
                  <span>KES {priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(...movies.map(m => m.price))}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Minimum Rating</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                    className={`p-2 rounded-lg ${
                      ratingFilter >= star
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <FiStar size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sort By</h3>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Featured</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="date">Release Date: Oldest</option>
                <option value="-date">Release Date: Newest</option>
                <option value="rating">Rating: Highest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Active Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {searchQuery && (
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center">
              {searchQuery}
              <FiX
                className="ml-2 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </div>
          )}
          {sortBy && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
              Sorted by: {sortBy.replace("-", "")} {sortBy.startsWith("-") ? "(Desc)" : "(Asc)"}
              <FiX className="ml-2 cursor-pointer" onClick={() => setSortBy("")} />
            </div>
          )}
          {ratingFilter > 0 && (
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center">
              {ratingFilter}+ Stars
              <FiX className="ml-2 cursor-pointer" onClick={() => setRatingFilter(0)} />
            </div>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>

        {/* Empty State */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-4">No movies found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsFiltersOpen(true)}
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors lg:hidden"
      >
        <FiSliders size={24} />
      </button>
    </div>
  );
};

export default Movies;