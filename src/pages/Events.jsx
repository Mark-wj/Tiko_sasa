import { useEffect, useState } from "react";
import EventsCard from "../components/EventsCard";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("title");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accounts/events/")
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
    <div className="max-w-[96%] mx-auto px-6 py-10">
      {/* Search Bar */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex w-full max-w-md">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by venue, date, price or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="venue">Venue</option>
            <option value="date">Date</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar: Sort Options and Ads */}
        <aside className="w-full lg:w-1/4 space-y-6">
          <div className="p-4 border border-gray-200 rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Sort Events</h2>
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
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Sponsored</h2>
            <div className="space-y-4">
              <img
                src="https://tinyurl.com/36b3j7wr"
                alt="Ad Space 1"
                className="w-[360px] h-[540px] object-cover"
              />
              <img
                src="https://tinyurl.com/5mdrd3zv"
                alt="Ad Space 2"
                className="w-[360px] h-[540px] object-cover"
              />
            </div>
          </div>
        </aside>

        {/* Events Grid */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, idx) => (
            <Link to={`/events/${idx}`} key={idx}>
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
      </div>
    </div>
  );
};

export default Events;
