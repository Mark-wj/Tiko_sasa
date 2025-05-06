import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HotelsCard from "../components/HotelsCard";
import { FiSearch, FiFilter, FiSliders, FiX, FiStar } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("name");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const handler = setTimeout(() => {
      filterHotels();
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, filterKey, sortBy, priceRange, ratingFilter, hotels]);

  const filterHotels = () => {
    let updatedHotels = [...hotels];

    // Price filter
    updatedHotels = updatedHotels.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Rating filter
    if (ratingFilter > 0) {
      updatedHotels = updatedHotels.filter(
        (hotel) => hotel.rating >= ratingFilter
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      updatedHotels = updatedHotels.filter((hotel) => {
        const value = hotel[filterKey]?.toString().toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    // Sorting
    if (sortBy) {
      updatedHotels.sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "-price") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "-rating") return a.rating - b.rating;
        return 0;
      });
    }

    setFilteredHotels(updatedHotels);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://tiko-sasa-backend.onrender.com/api/accounts/hotels/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch hotels");
        return res.json();
      })
      .then((data) => {
        setHotels(data);
        setFilteredHotels(data);
        const maxPrice = Math.max(...data.map((h) => h.price));
        setMaxPrice(maxPrice);
        setPriceRange([0, maxPrice]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} height={400} className="rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        ⚠️ Error loading hotels: {error}
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
      src="https://tinyurl.com/42m4k68p"         // ← swap in your hotel hero image
      alt="Discover Luxury Stays background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black opacity-50" />
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Discover Luxury Stays
    </h1>
    <div className="relative max-w-2xl mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-lg">
        <FiSearch className="ml-4 text-gray-400" size={24} />
        <input
          type="text"
          className="w-full py-4 px-4 rounded-full focus:outline-none text-gray-800"
          placeholder="Search hotels by name, location, or amenities..."
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
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isFiltersOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={() => setIsFiltersOpen(false)}
      >
        <div className="p-6 h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
            <button
              onClick={() => setIsFiltersOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto">
            <div>
              <h3 className="text-lg font-semibold mb-4">Price Range (KES)</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 text-sm font-medium">
                  <span>{priceRange[0]}</span>
                  <span>{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(...hotels.map((h) => h.price)) || 1000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Star Rating</h3>
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
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Featured</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="rating">Rating: Highest</option>
                <option value="-rating">Rating: Lowest</option>
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
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
              {searchQuery}
              <FiX
                className="ml-2 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </div>
          )}
          {sortBy && (
            <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center">
              Sorted by: {sortBy.replace("-", "")}{" "}
              {sortBy.startsWith("-") ? "(Desc)" : "(Asc)"}{" "}
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

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10%] h-96 mb-[68%] mt-[-5%]">
          {filteredHotels.map((hotel) => (
            <Link
              to={`/hotels/${hotel.id}`}
              key={hotel.id}
              className="transform transition-transform hover:scale-105"
            >
              <HotelsCard
                name={hotel.name}
                address={hotel.address}
                price={hotel.price}
                rating={hotel.rating}
                image={hotel.image}
              />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🏨</div>
            <h3 className="text-2xl font-bold mb-4">No hotels found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsFiltersOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors lg:hidden"
      >
        <FiSliders size={24} />
      </button>
    </div>
  );
};

export default Hotels;
