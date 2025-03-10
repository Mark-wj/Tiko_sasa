import StripePayment from "../components/CheckoutForm";

function CheckoutPage() {
  return (
    <div>
      <h2>Complete Your Payment</h2>
      <StripePayment />
    </div>
  );
}

export default CheckoutPage;
