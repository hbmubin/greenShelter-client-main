import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const OfferForm = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { state } = useLocation(); // Assuming you pass the property data via location state
  const { propertyTitle, propertyLocation, agentName, priceRange, propertyId } =
    state.property;
  const { user } = state;

  const [offeredAmount, setOfferedAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (offeredAmount < priceRange[0] || offeredAmount > priceRange[1]) {
      alert("Offered amount must be within the specified price range.");
      return;
    }

    const offerData = {
      propertyId,
      offeredAmount,
      buyerEmail: user.email,
      buyerName: user.name,
      buyingDate,
    };

    try {
      const response = await axiosPublic.post("/submit-offer", offerData);
      if (response.data.success) {
        navigate("/property-bought");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("Failed to submit offer. Please try again.");
    }
  };

  return (
    <div className="offer-form">
      <h2>Make an Offer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Property Title</label>
          <input type="text" value={propertyTitle} readOnly />
        </div>
        <div>
          <label>Property Location</label>
          <input type="text" value={propertyLocation} readOnly />
        </div>
        <div>
          <label>Agent Name</label>
          <input type="text" value={agentName} readOnly />
        </div>
        <div>
          <label>Offered Amount</label>
          <input
            type="number"
            value={offeredAmount}
            onChange={(e) => setOfferedAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Buyer Email</label>
          <input type="email" value={user.email} readOnly />
        </div>
        <div>
          <label>Buyer Name</label>
          <input type="text" value={user.name} readOnly />
        </div>
        <div>
          <label>Buying Date</label>
          <input
            type="date"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Offer</button>
      </form>
    </div>
  );
};

export default OfferForm;
