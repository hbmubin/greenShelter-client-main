import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const PropertyReviews = ({ property }) => {
  const { reviews, propertyTitle, _id } = property;
  const { user } = useContext(AuthContext);

  const handleReview = (event) => {
    event.preventDefault();
    const reviewDescription = event.target.review.value;
    const reviewerName = user.displayName;
    const reviewerEmail = user.email;
    const reviewerImage = user.photoURL;
    const propertyId = _id;
    const reviewData = {
      reviewDescription,
      reviewerEmail,
      reviewerName,
      propertyId,
      propertyTitle,
      reviewerImage,
    };
    fetch(`http://localhost:5000/property/${_id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
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
        {reviews.length}
        {")"}
      </h2>
      {reviews.map((review, idx) => (
        <div
          key={idx}
          className=" flex flex-col w-full  mx-auto mb-4 divide-y rounded-3xl dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800"
        >
          <div className="flex justify-between p-4">
            <div className="flex gap-4 items-center">
              <div>
                <img
                  src="https://source.unsplash.com/100x100/?portrait"
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
