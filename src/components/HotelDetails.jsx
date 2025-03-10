import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    fetch(`http://127.0.0.1:8000/api/accounts/hotels/${id}`)
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
    return <div>Loading hotel details...</div>;
  }

  const price = hotel.price;
  const subtotalDisplay = (price * quantity).toFixed(2);
  const taxesDisplay = (price * quantity * 0.1).toFixed(2);
  const shippingDisplay = (0.0).toFixed(2);

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Hotel Details Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row items-stretch">
        {/* Left Column: Hotel Image */}
        <img
          className="w-full md:w-1/2 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          src={hotel.image}
          alt={hotel.name}
        />
        {/* Right Column: Hotel Details & Checkout Cart */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Hotel Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{hotel.name}</h2>
            <p className="mt-2 text-gray-600">{hotel.address}</p>
            <p className="mt-2 text-gray-600">
              Price: <span className="font-bold">KES {hotel.price}</span>
            </p>
            <p className="mt-2 text-gray-600">
              Rating: <span className="font-bold">{hotel.rating}</span>
            </p>
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
                          src={hotel.image}
                          alt={hotel.name}
                        />
                        <span className="font-semibold">{hotel.name}</span>
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
                    <td className="py-4">KES {(price * quantity).toFixed(2)}</td>
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
          {/* Gallery Section */}
          {hotel.gallery && hotel.gallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {hotel.gallery.map((item, index) => (
                <img
                  key={item.id || index}
                  src={item.image_url}
                  alt={item.caption || `Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover rounded cursor-pointer"
                  onClick={() => setExpandedImage(item.image_url)}
                />
              ))}
            </div>
          )}
      {/* Modal Popup for Checkout */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 text-center">
            <img
              src="https://tinyurl.com/35azntz4"
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

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-pointer"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="Expanded view"
            className="max-w-full max-h-full rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
