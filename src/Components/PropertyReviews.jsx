import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import useVerifiedProperties from "../Hooks/useVerifiedProperties";

const PropertyReviews = ({ property }) => {
  const { reviews, propertyTitle, agentName, _id } = property;
  const [, refetch, isPending] = useVerifiedProperties();

  const { user } = useContext(AuthContext);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const period = isPM ? "PM" : "AM";

    return `${hours}:${formattedMinutes} ${period} ${day}/${month}/${year}`;
  };

  const generateUniqueId = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomHex = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    return timestamp + randomHex;
  };

  const handleReview = (event) => {
    event.preventDefault();
    const reviewDescription = event.target.review.value;
    const reviewerName = user.displayName;
    const reviewerEmail = user.email;
    const reviewerImage = user.photoURL;
    const propertyId = _id;
    const reviewTime = formatTime(new Date());
    const reviewId = generateUniqueId();

    const reviewData = {
      reviewId,
      reviewDescription,
      reviewerEmail,
      reviewerName,
      propertyId,
      propertyTitle,
      reviewerImage,
      reviewTime,
      agentName,
    };

    fetch(
      `https://green-shelter-server-a-12.vercel.app/property/${_id}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          event.target.reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Added Review",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="bg-gray-100 px-6 mt-16 pb-10">
      <h2 className="text-2xl font-semibold py-6">
        Reviews {"("}
        {reviews?.length > 0 ? reviews?.length : "0"}
        {")"}
      </h2>
      {reviews?.map((review) => (
        <div
          key={review.reviewId}
          className="flex flex-col w-full mx-auto mb-4 divide-y rounded-3xl dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800"
        >
          <div className="flex justify-between p-4">
            <div className="flex gap-4 items-center">
              <div>
                <img
                  src={
                    review.reviewerImage ||
                    "https://source.unsplash.com/100x100/?portrait"
                  }
                  alt=""
                  className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                />
              </div>
              <div>
                <h4 className="font-bold">{review.reviewerName}</h4>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2 text-sm dark:text-gray-600">
            {review.reviewDescription}
          </div>
        </div>
      ))}
      <form onSubmit={handleReview} className="bg-base-100 p-5 rounded-3xl">
        <h2 className="py-6 text-3xl font-semibold">Leave a Review</h2>

        <textarea
          className="textarea textarea-lg w-full textarea-bordered"
          placeholder="Your Review"
          name="review"
        ></textarea>
        <div className="form-control mt-6">
          <input
            type="submit"
            className="btn bg-orange-400 rounded-3xl text-white"
            value="Post Review"
          />
        </div>
      </form>
    </div>
  );
};

export default PropertyReviews;
