import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCast from "./MovieCast";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= movie.rating) {
        stars.push(
          <span key={i} className="text-yellow-500 text-xl">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300 text-xl">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  useEffect(() => {
    fetch(`https://tiko-sasa-backend-production.up.railway.app/api/accounts/movies/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Data");
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  useEffect(() => {
    if (movie && movie.price != null) {
      const subtotal = movie.price * quantity;
      const taxes = subtotal * 0.1; // 10% tax
      const shipping = 0.0; // Free shipping
      setTotal(subtotal + taxes + shipping);
    }
  }, [quantity, movie]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Modal handlers
  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!movie || Object.keys(movie).length === 0) {
    return <div className="text-center py-8">Loading movie details...</div>;
  }

  const price = movie.price;
  const subtotalDisplay = (price * quantity).toFixed(2);
  const taxesDisplay = (price * quantity * 0.1).toFixed(2);
  const shippingDisplay = (0.0).toFixed(2);

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Poster image on the left */}
          <img
            className="w-full md:w-1/2 object-cover rounded-l-lg md:mr-6"
            src={movie.poster}
            alt={movie.title}
          />
          {/* Details section */}
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold text-gray-900">{movie.title}</h2>
            <p className="mt-2 text-gray-600">Genre: {movie.genre}</p>
            <div className="mt-2 flex items-center">
              <span className="mr-2 text-gray-700">Rating:</span>
              {renderStars()}
            </div>
            <p className="mt-2 text-gray-600">
              Price: <span className="font-bold">KES {movie.price}</span>
            </p>
            <p className="mt-2 text-gray-600">Duration: {movie.duration} hrs</p>
            <p className="mt-2 text-gray-600">Showing on: {movie.date}</p>
            <p className="mt-2 text-gray-600">
              Tickets Available: {movie.no_of_tickets}
            </p>
            <div>
              <MovieCast />
            </div>
            {/* Checkout / Shopping Cart Section */}
            <div className="bg-white rounded-lg p-6 mt-6">
              <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
              <div className="bg-white rounded-lg p-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold pb-2 border-b">
                        Product
                      </th>
                      <th className="text-left font-semibold pb-2 border-b">
                        Price
                      </th>
                      <th className="text-left font-semibold pb-2 border-b">
                        Quantity
                      </th>
                      <th className="text-left font-semibold pb-2 border-b">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4 rounded"
                            src={movie.poster}
                            alt={movie.title}
                          />
                          <span className="font-semibold">{movie.title}</span>
                        </div>
                      </td>
                      <td className="py-4">KES {price.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            onClick={handleDecrement}
                            className="bg-gray-200 text-gray-700 rounded-md px-3 py-1"
                          >
                            -
                          </button>
                          <span className="mx-3">{quantity}</span>
                          <button
                            onClick={handleIncrement}
                            className="bg-gray-200 text-gray-700 rounded-md px-3 py-1"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        KES {(price * quantity).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary Section */}
              <div className="bg-white rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>KES {subtotalDisplay}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>KES {taxesDisplay}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>KES {shippingDisplay}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>KES {total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Coming soon"
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">Coming soon</h2>
            <p className="mb-4">This feature is under construction.</p>
            <div className="flex justify-around">
              <button
                onClick={handleGoBack}
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                Go Back
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
