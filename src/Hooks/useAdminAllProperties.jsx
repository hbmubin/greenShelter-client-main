import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminAllProperties = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: properties = [],
    isPending,
  } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/properties");
      return res.data;
    },
  });

  return [properties, refetch, isPending];
};

export default useAdminAllProperties;
