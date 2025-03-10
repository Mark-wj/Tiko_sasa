import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/accounts/events/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch event details");
        }
        return res.json();
      })
      .then((data) => {
        const i = parseInt(id, 10);
        if (i >= 0 && i < data.length) {
          setEvent(data[i]);
        } else {
          console.error("Index out of bounds");
        }
      })
      .catch((err) => console.error(err.message));
  }, [id]);

  useEffect(() => {
    if (event && event.price != null) {
      const subtotal = event.price * quantity;
      const taxes = subtotal * 0.1;
      const shipping = 0.0;
      setTotal(subtotal + taxes + shipping);
    }
  }, [quantity, event]);

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

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading event details...
      </div>
    );
  }

  const price = event.price;
  const subtotalDisplay = (price * quantity).toFixed(2);
  const taxesDisplay = (price * quantity * 0.1).toFixed(2);
  const shippingDisplay = (0.0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Event Details Section */}
      <div className="max-w-8xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        <h2 className="text-3xl text-rose-500 font-bold mb-4">{event.title}</h2>
        <div className="flex flex-col md:flex-row items-stretch">
          <img
            className="w-full md:w-1/2 object-cover rounded-lg md:mr-6"
            src={event.image}
            alt={event.title}
          />
          <div className="flex-1 p-4">
            <p className="text-lg mb-2">
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="text-lg mb-2">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-lg mb-2">
              <strong>Price:</strong> KES {price.toFixed(2)}
            </p>
            <p className="text-lg mb-4">
              <strong>Tickets Available:</strong> {event.no_of_tickets}
            </p>

            {/* Checkout / Shopping Cart Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
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
                            src={event.image || "https://via.placeholder.com/150"}
                            alt={event.title}
                          />
                          <span className="font-semibold">{event.title}</span>
                        </div>
                      </td>
                      <td className="py-4">${price.toFixed(2)}</td>
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
                        ${(price * quantity).toFixed(2)}
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
                  <span>${subtotalDisplay}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>${taxesDisplay}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>${shippingDisplay}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
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

export default EventDetails;
