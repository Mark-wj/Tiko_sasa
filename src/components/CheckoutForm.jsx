import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your_publishable_key");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/api/accounts/stripe/create-checkout-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: "Test Product", amount: 10 }), // Example
    });
    
    const session = await response.json();
    if (session.error) {
      alert(session.error);
      setLoading(false);
      return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>
    </div>
  );
}

function StripePayment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default StripePayment;
