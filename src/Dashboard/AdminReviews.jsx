import { useContext } from "react";
import useAdminAllReviews from "../Hooks/useAdminAllReviews";
import AdminReviewCard from "./AdminReviewCard";
import { AuthContext } from "../Providers/AuthProvider";

const AdminReviews = () => {
  const [reviews, refetch, isPending] = useAdminAllReviews();
  const { loading } = useContext(AuthContext);

  if (loading || isPending) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <div className="text-center py-14 text-3xl font-semibold">
        <h1>All Properties {`(${reviews.length})`}</h1>
      </div>
      <div className="grid  md:grid-cols-2 grid-cols-1 gap-4 px-6">
        {reviews.map((review, idx) => (
          <AdminReviewCard key={idx} review={review}></AdminReviewCard>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
