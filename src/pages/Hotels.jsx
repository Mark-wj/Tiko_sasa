import { useState, useEffect } from "react";
import HotelsCard from "../components/HotelsCard";
import { Link } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("name");

  useEffect(() => {
    fetch("https://tiko-sasa-backend-production.up.railway.app/api/accounts/hotels/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch hotel");
        }
        return res.json();
      })
      .then((data) => {
        setHotels(data);
        setFilteredHotels(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    let updatedHotels = [...hotels];

    if (searchQuery.trim() !== "") {
      updatedHotels = updatedHotels.filter((hotel) => {
        const value = hotel[filterKey]?.toString().toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    if (sortBy !== "") {
      updatedHotels.sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        } else if (sortBy === "rating") {
          return a.rating - b.rating;
        }
        return 0;
      });
    }

    setFilteredHotels(updatedHotels);
  }, [searchQuery, filterKey, sortBy, hotels]);

  return (
    <div className="max-w-[96%] mx-auto px-6 py-10">
      {/* Search Bar */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex w-full max-w-md">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, address, rating or price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="address">Address</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar: Sort Options and Ads */}
        <aside className="w-full lg:w-1/4 space-y-6">
          <div className="p-4 border border-gray-200 rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Sort Hotels
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
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Ads Section */}
          <div className="p-4 border border-gray-200 rounded-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Sponsored
            </h2>
            <div className="space-y-4">
              <img
                src="https://tinyurl.com/mr3zudpr"
                alt="Ad Space 1"
                className="w-[360px] h-1/2 object-cover"
              />
              <img
                src="https://tinyurl.com/43szu2xc"
                alt="Ad Space 2"
                className="w-[360px] h-1/2 object-cover"
              />
            </div>
          </div>
        </aside>

        {/* Hotels Grid */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <Link to={`/hotels/${hotel.id}`} key={hotel.id}>
              <HotelsCard
                name={hotel.name}
                address={hotel.address}
                price={hotel.price}
                rating={hotel.rating}
                image={hotel.image}
              />
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Hotels;
