import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loadReviews, setLoadReviews] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/recent-reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoadReviews(false);
      });
  }, []);

  return (
    <div className="py-16">
      <div className="text-center">
        <div className="text-orange-400 mb-4">HEAR FROM OUR</div>
        <div className="text-5xl font-semibold">MOST RECENT REVIEWS</div>
      </div>
      {loadReviews && (
        <div className="flex w-full py-28 items-center justify-center">
          <span className="loading loading-ring  w-28"></span>
        </div>
      )}
      <div className="grid lg:grid-cols-2 px-6 py-[15vh] gap-6">
        {reviews?.map((review, idx) => (
          <ReviewCard review={review} key={idx}>
            Reviews
          </ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
