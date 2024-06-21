import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const CheckoutForm = ({ propertyData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { offeredAmount } = propertyData;
  const { user, loading } = useContext(AuthContext);

  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    if (propertyData.boughtStatus === "bought") {
      setPaymentStatus(true);
    }
  }, [propertyData.boughtStatus]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setPaymentError(error.message);
    } else {
      const buyerInfo = {
        buyerEmail: user.email,
        buyerName: user.displayName,
        buyerPhotoURL: user.photoURL,
        offeredAmount,
        agentEmail: propertyData.propertyDetails.agentEmail,
        offerId: propertyData.offerId,
      };
      console.log(buyerInfo);
      axiosSecure
        .post(
          `/agent/payment-confirm/${paymentMethod.id}/${propertyData.propertyId}`,
          buyerInfo
        )
        .then((res) => {
          console.log(res.data);
          setPaymentError("");
          setPaymentStatus(true);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log("Payment confirmation error", error);
          setPaymentError("Payment confirmation failed");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="text-center mt-4 border-t-2 border-t-slate-200">
        <button
          className="btn rounded-3xl mt-4 w-32 bg-green-400 text-white"
          type="submit"
          disabled={paymentStatus}
        >
          Pay
        </button>
      </div>
      <p className="text-red-400">{paymentError}</p>
    </form>
  );
};

export default CheckoutForm;
