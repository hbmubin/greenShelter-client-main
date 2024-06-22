import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminAllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: reviews = [],
    isPending,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reviews");
      return res.data;
    },
  });

  return [reviews, refetch, isPending];
};

export default useAdminAllReviews;
