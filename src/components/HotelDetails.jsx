import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiChevronLeft, FiPlus, FiMinus, FiX } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    // Fetch hotel details including gallery images from the hotel serializer
    fetch(`https://tiko-sasa-backend.onrender.com/api/accounts/hotels/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch hotel data");
        }
        return res.json();
      })
      .then((data) => {
        setHotel(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  useEffect(() => {
    if (hotel && hotel.price != null) {
      const subtotal = hotel.price * quantity;
      const taxes = subtotal * 0.1; // 10% tax
      const shipping = 0.0; // Free shipping
      setTotal(subtotal + taxes + shipping);
    }
  }, [quantity, hotel]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Modal handlers for checkout
  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!hotel || Object.keys(hotel).length === 0) {
    return (
      <div className="max-w-8xl mx-auto p-6">
        <Skeleton height={400} className="mb-6 rounded-xl" />
        <div className="space-y-4">
          <Skeleton width={300} height={40} />
          <Skeleton width={200} height={24} />
          <Skeleton width={250} height={24} />
          <Skeleton height={300} />
        </div>
      </div>
    );
  }

  const price = hotel?.price || 0;
  const subtotalDisplay = (price * quantity).toFixed(2);
  const taxesDisplay = (price * quantity * 0.1).toFixed(2);
  const shippingDisplay = (0).toFixed(2);


  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-[2%]">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="mt-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiChevronLeft className="mr-2" /> Back to listings
      </button>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 mt-6">
        {/* Image Gallery Section */}
        <div className="space-y-6">
          <div className="relative group rounded-2xl overflow-hidden shadow-xl">
            <img
              className="w-full h-96 object-cover transform transition-transform duration-300 group-hover:scale-105"
              src={hotel.image}
              alt={hotel.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold">{hotel.name}</h1>
              <div className="flex items-center mt-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                  ★ {hotel.rating}
                </span>
                <span className="ml-3">{hotel.address}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {hotel.gallery?.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {hotel.gallery.map((item, index) => (
                <div
                  key={item.id || index}
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => setExpandedImage(item.image_url)}
                >
                  <img
                    src={item.image_url}
                    alt={item.caption || `Gallery image ${index + 1}`}
                    className="w-full h-32 object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  {item.caption && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm text-center px-2">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <span className="text-xl font-bold text-rose-600">
    KES {price.toFixed(2)}
  </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Quantity</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleDecrement}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50"
                    disabled={quantity === 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">KES {subtotalDisplay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes (10%)</span>
              <span className="font-medium">KES {taxesDisplay}</span>
            </div>
          </div>

          {/* Total and Checkout */}
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <span className="font-bold text-lg">Total</span>
              <span className="text-2xl font-bold text-rose-600">
                KES {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-indigo-600 to-rose-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow hover:scale-[1.02] transform duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Modern Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform animate-scale-in">
            <div className="p-6 text-center">
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/765/765686.png"
                alt="Coming soon"
                className="w-32 h-32 mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold mb-2">Checkout Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Our secure payment system is currently under development.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Back to Hotel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Image Viewer */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => setExpandedImage(null)}
          >
            <FiX className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full p-4">
            <img
              src={expandedImage}
              alt="Expanded view"
              className="w-full h-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
