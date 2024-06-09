import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useUserWishlist = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { refetch, data: wishlist = [] } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user-wishlist/${user.email}`);
      return res.data;
    },
  });

  return [wishlist, refetch];
};

export default useUserWishlist;
