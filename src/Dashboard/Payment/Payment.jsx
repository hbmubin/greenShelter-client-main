import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./ChekoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PK);
// console.log(stripePromise);

const Payment = () => {
  const location = useLocation();

  const parseQueryParams = (queryString) => {
    const params = new URLSearchParams(queryString);
    return Object.fromEntries(params.entries());
  };

  const queryParams = parseQueryParams(location.search);
  const propertyData = queryParams.property
    ? JSON.parse(decodeURIComponent(queryParams.property))
    : {};

  // console.log(propertyData);

  return (
    <div className="min-h-screen bg-gray-200  flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <div className="text-center text-2xl text-neutral-700 font-semibold mb-10">
          <h2>Check Out : ${propertyData.offeredAmount}</h2>
        </div>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm propertyData={propertyData}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
