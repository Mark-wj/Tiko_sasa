import { useState, useEffect } from "react";

const Checkout = () => {
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productPrice = 19.99; // Constant product price

  // Update the total whenever the quantity changes
  useEffect(() => {
    const subtotal = productPrice * quantity;
    const taxes = subtotal * 0.1; // 10% tax rate
    const shipping = 0.00; // Free shipping
    setTotal(subtotal + taxes + shipping);
  }, [quantity, productPrice]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Compute display values
  const subtotal = (productPrice * quantity).toFixed(2);
  const taxes = (productPrice * quantity * 0.1).toFixed(2);
  const shipping = (0.00).toFixed(2);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4"
                            src="https://via.placeholder.com/150"
                            alt="Product image"
                          />
                          <span className="font-semibold">Product name</span>
                        </div>
                      </td>
                      <td className="py-4">${productPrice.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            onClick={handleDecrement}
                            className="border rounded-md py-2 px-4 mr-2"
                          >
                            -
                          </button>
                          <span className="text-center w-8">{quantity}</span>
                          <button
                            onClick={handleIncrement}
                            className="border rounded-md py-2 px-4 ml-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        ${(productPrice * quantity).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>${taxes}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
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

export default Checkout;
