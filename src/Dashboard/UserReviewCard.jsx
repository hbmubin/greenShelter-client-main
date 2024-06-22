import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useUserReviews from "../Hooks/useUserReview";

const UserReviewCard = ({ review }) => {
  const [, refetch] = useUserReviews();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const handleDelete = () => {
    axiosSecure
      .delete(
        `/delete-userReview/${review.propertyId}/${user.email}/${review.reviewId}`
      )
      .then((res) => {
        // console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Delete successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // console.log(review);
  return (
    <div className="bg-gray-100 mb- p-10 mb-6">
      <p className="text-neutral-600 p-2 bg-gray-200  mb-2">
        {review.reviewDescription}
      </p>
      <h2 className="text-xl font-semibold">
        Property Name : {review.propertyTitle}
      </h2>
      <p className=""> Agent : {review?.agentName}</p>
      <p className="text-neutral-500 text-sm  mb-3">
        Review Time : {review?.reviewTime}
      </p>
      <button
        onClick={handleDelete}
        className="btn rounded-3xl bg-orange-500 text-white"
      >
        Delete
      </button>
    </div>
  );
};

export default UserReviewCard;
