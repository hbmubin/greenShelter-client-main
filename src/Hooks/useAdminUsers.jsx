import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: users = [],
    isPending,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-users");
      return res.data;
    },
  });

  return [users, refetch, isPending];
};

export default useAdminUsers;
