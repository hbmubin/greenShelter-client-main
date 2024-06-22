import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UserReviewCard from "./UserReviewCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUserReviews from "../Hooks/useUserReview";

const UserReviews = () => {
  const { user, loading } = useContext(AuthContext);
  const [reviews] = useUserReviews();

  // console.log(reviews);
  if (loading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="py-4">
      <div className="text-center mt-6 mb-10 ">
        <h2 className="text-3xl font-semibold">
          My Reviews : {`(${reviews.length})`}
        </h2>
      </div>
      <div className="px-6">
        {reviews.map((review, idx) => (
          <UserReviewCard key={idx} review={review}></UserReviewCard>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
