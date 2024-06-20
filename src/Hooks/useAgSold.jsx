import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAgSold = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    data: soldProperties = [],
    isPending,
  } = useQuery({
    queryKey: ["soldProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/sold-properties/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return [soldProperties, refetch, isPending];
};

export default useAgSold;
