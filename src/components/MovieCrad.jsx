import { Link } from "react-router-dom";

const MovieCard = ({ title, genre, poster, rating, price, date }) => {
  // Helper function to render stars based on the rating (assumes rating is between 0 and 5)
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Filled star
        stars.push(
          <span key={i} className="text-yellow-500 text-lg">
            &#9733;
          </span>
        );
      } else {
        // Unfilled star
        stars.push(
          <span key={i} className="text-gray-300 text-lg">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <a href="/movies/:id" className="group relative block bg-black">
      <img
        alt={title}
        src={poster}
        className="absolute inset-0 w-full h-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
          {genre}
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl">{title}</p>

        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            {/* Render the stars for the rating */}
            <div className="flex items-center mb-2">
              {renderStars()}
            </div>
            <p className="text-sm text-white">KES: {price}</p>
            <p className="text-sm text-white">Showing on: {date}</p>
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

export default MovieCard;
