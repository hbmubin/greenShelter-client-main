import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const OfferForm = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { user, loading } = useContext(AuthContext);
  const property = useLoaderData();
  const {
    propertyImage,
    propertyTitle,
    propertyLocation,
    agentName,
    agentImage,
    priceRange,
    propertyDescriptions,
  } = property;

  const [offeredAmount, setOfferedAmount] = useState("");
  const date = new Date();
  const offerDate = date.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (offeredAmount < priceRange[0] || offeredAmount > priceRange[1]) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Offered amount must be within the specified price range.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const offerData = {
      propertyId: property._id,
      offeredAmount,
      buyerEmail: user.email,
      offerDate,
    };
    console.log(offerData);

    const response = await axiosPublic.post("/submit-offer", offerData);
    if (response.data.modifiedCount > 0) {
      navigate("/property-bought");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Offered successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log(response.data);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl  font-semibold text-center mt-6 mb-10">
        Make an Offer
      </h2>

      <div className="offer-form w-full flex items-center justify-center">
        <form
          className="p-6 bg-gray-100 rounded-3xl border-2"
          onSubmit={handleSubmit}
        >
          <div className=" flex gap-4">
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Property Title</span>
                </label>
                <input
                  className="input input-bordered rounded-3xl"
                  type="text"
                  value={propertyTitle}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Property Location</span>
                </label>
                <input
                  className="input input-bordered rounded-3xl"
                  type="text"
                  value={propertyLocation}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Agent Name</span>
                </label>
                <input
                  className="input input-bordered rounded-3xl"
                  type="text"
                  value={agentName}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Offer Amount:{" "}
                    {priceRange.map((p, idx) => (
                      <span key={idx}>
                        ${p}
                        {idx === 0 && " - "}
                      </span>
                    ))}
                  </span>
                </label>
                <input
                  className="input input-bordered rounded-3xl"
                  type="number"
                  value={offeredAmount}
                  onChange={(e) => setOfferedAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Buyer Email</span>
                </label>
                <input
                  className="input input-bordered rounded-3xl"
                  type="email"
                  value={user.email}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Buyer Name</span>
                </label>
                <input
                  className="input input-bordered rounded-3xl"
                  type="text"
                  value={user.displayName}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Buying Date</span>
                </label>
                <input
                  className="input input-bordered rounded-3xl"
                  type="date"
                  value={offerDate}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn rounded-3xl mt-6  bg-orange-400"
              type="submit"
            >
              Submit Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferForm;
