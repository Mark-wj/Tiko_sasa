import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCast from "./MovieCast";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-2xl ${i < movie.rating ? 'text-amber-400' : 'text-gray-200'}`}
      >
        &#9733;
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt[10%]">
      <div className="max-w-7xl mx-auto mt-[4%]">
        <button
          onClick={handleGoBack}
          className="mb-8 flex items-center text-slate-300 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Movies
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-8">
            <div className="lg:w-1/3 relative group overflow-hidden rounded-2xl">
              <img
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                src={movie.poster}
                alt={movie.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-sm bg-amber-500 px-3 py-1 rounded-full">
                  {movie.genre}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-6 text-slate-100">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  {renderStars()}
                  <span className="ml-2 text-gray-400">({movie.rating}/5)</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {movie.duration} hrs
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {movie.date}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Price per ticket</p>
                  <p className="text-2xl font-bold text-rose-400">KES {movie.price}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Available tickets</p>
                  <p className="text-2xl font-bold text-rose-400">{movie.no_of_tickets}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-transparent p-6 rounded-2xl">
                  <h2 className="text-2xl font-bold text-gray-400 mb-4">Your Selection</h2>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">Tickets</span>
                      <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
                        <button
                          onClick={handleDecrement}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          −
                        </button>
                        <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                        <button
                          onClick={handleIncrement}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-rose-400">
                      KES {(price * quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-rose-400">KES {subtotalDisplay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxes (10%)</span>
                      <span className="text-rose-400">KES {taxesDisplay}</span>
                    </div>
                    <hr className="border-gray-300 my-3" />
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-500">Total</span>
                      <span className="text-amber-400">KES {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02]"
                  >
                    Secure Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <MovieCast cast={movie.cast} />
        </div>

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-800">
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="bg-amber-500/20 p-6 rounded-full">
                    <svg className="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Feature Coming Soon!</h2>
                <p className="text-slate-400 mb-8">
                  We're working hard to bring you an amazing checkout experience. Stay tuned!
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleGoBack}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
                  >
                    Back to Movie
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;