import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiCheckCircle, 
  FiCalendar,  // Add this
  FiMapPin     // Add this
} from "react-icons/fi";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://tiko-sasa-backend-production.up.railway.app/api/accounts/events/")
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={handleGoBack}
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <FiArrowLeft className="mr-2" /> Back to Events
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FiCalendar /> {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin /> {event.venue}
                </div>
              </div>
            </div>

            <img
              src={event.image}
              alt={event.title}
              className="w-full h-96 object-cover rounded-xl mb-8"
            />

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <p>{event.description || "More details coming soon..."}</p>
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="sticky top-8 h-fit bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Purchase Tickets</h2>
            
            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Standard Ticket</h3>
                  <span className="text-indigo-600 font-bold">KES {price}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Tickets</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDecrement}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={handleIncrement}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KES {subtotalDisplay}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (10%)</span>
                  <span>KES {taxesDisplay}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>KES {total.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center">
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Checkout Coming Soon!</h3>
            <p className="text-gray-600 mb-6">
              Our secure checkout system is currently under development.
              Please check back soon!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
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