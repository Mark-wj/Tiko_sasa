import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventsCard from "../components/EventsCard";
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiDollarSign,
  FiX,
} from "react-icons/fi";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("title");
  const [sortBy, setSortBy] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Fetch all events once
  useEffect(() => {
    fetch(
      "https://tiko-sasa-backend-production.up.railway.app/api/accounts/events/"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  // Re‑filter whenever searchQuery, filterKey, sortBy, or events change
  useEffect(() => {
    let updated = [...events];

    // Search filter
    if (searchQuery.trim()) {
      updated = updated.filter((e) => {
        const val = e[filterKey]?.toString().toLowerCase();
        return val?.includes(searchQuery.toLowerCase());
      });
    }

    // Sort
    if (sortBy === "date") {
      updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "price") {
      updated.sort((a, b) => a.price - b.price);
    }

    setFilteredEvents(updated);
  }, [searchQuery, filterKey, sortBy, events]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero‑Style Search */}
      <div className="relative py-12 px-4 text-white mt-16">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://tinyurl.com/388rjz59" // ← swap in your hero image
            alt="Discover Events background"
            className="w-full h-[150%] object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-full shadow-lg">
            <FiSearch className="ml-4 text-gray-400" size={24} />
            <input
              type="text"
              className="w-full py-4 px-4 rounded-full focus:outline-none text-gray-800"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiFilter className="text-gray-600" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 transform ${
          isFiltersOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform ease-in-out duration-300`}
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
            {/* Search‑By */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Search By</h3>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={filterKey}
                onChange={(e) => setFilterKey(e.target.value)}
              >
                <option value="title">Title</option>
                <option value="venue">Venue</option>
                <option value="date">Date</option>
                <option value="price">Price</option>
              </select>
            </div>

            {/* Sort‑By */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sort By</h3>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Featured</option>
                <option value="date">Date</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-4 flex flex-wrap gap-3">
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
              Sorted by: {sortBy}
              <FiX
                className="ml-2 cursor-pointer"
                onClick={() => setSortBy("")}
              />
            </div>
          )}
        </div>
      </div>

      {/* Events Grid & Sponsored Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Grid */}
          <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <Link
                to={`/events/${idx}`}
                key={idx}
                className="transform transition-transform hover:scale-[1.02]"
              >
                <EventsCard {...event} />
              </Link>
            ))}
          </main>

          {/* Sponsored Sidebar */}
          <aside className="lg:w-80 xl:w-96 space-y-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">
                Sponsored Events
              </h2>
              <div className="space-y-4">
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src="https://tinyurl.com/msu6rzr7"
                    alt="Ad"
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white font-medium">
                      Summer Festival
                    </h3>
                    <p className="text-sm text-white/80">
                      Limited tickets available
                    </p>
                  </div>
                </div>
                {/* Add more ads here */}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Events;
