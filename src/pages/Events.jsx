import { useEffect, useState } from "react";
import EventsCard from "../components/EventsCard";
import { Link } from "react-router-dom";
import { FiSearch, FiFilter, FiCalendar, FiDollarSign } from "react-icons/fi";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("title");

  useEffect(() => {
    fetch("https://tiko-sasa-backend-production.up.railway.app/api/accounts/events/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    let updatedEvents = [...events];

    if (searchQuery.trim() !== "") {
      updatedEvents = updatedEvents.filter((event) => {
        const value = event[filterKey]?.toString().toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    if (sortBy !== "") {
      updatedEvents.sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        } else if (sortBy === "date") {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
    }

    setFilteredEvents(updatedEvents);
  }, [searchQuery, filterKey, sortBy, events]);

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="bg-white pl-4 pr-8 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 appearance-none bg-no-repeat bg-[right_1rem_center] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')]"
              value={filterKey}
              onChange={(e) => setFilterKey(e.target.value)}
            >
              <option value="title">Filter by</option>
              <option value="title">Title</option>
              <option value="venue">Venue</option>
              <option value="date">Date</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSortBy("")}
              className={`px-4 py-2 rounded-full ${
                !sortBy
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSortBy("date")}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                sortBy === "date"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FiCalendar /> Date
            </button>
            <button
              onClick={() => setSortBy("price")}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                sortBy === "price"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FiDollarSign /> Price
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <Link
                to={`/events/${idx}`}
                key={idx}
                className="transform transition-transform hover:scale-[1.02]"
              >
                <EventsCard
                  title={event.title}
                  venue={event.venue}
                  date={event.date}
                  price={event.price}
                  image={event.image}
                />
              </Link>
            ))}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 xl:w-96 space-y-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Sponsored Events</h2>
              <div className="space-y-4">
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src="https://source.unsplash.com/random/800x600?concert"
                    alt="Ad"
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white font-medium">Summer Festival</h3>
                    <p className="text-sm text-white/80">Limited tickets available</p>
                  </div>
                </div>
                {/* Add more ads similarly */}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Events;