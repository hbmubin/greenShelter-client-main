import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useVerifiedProperties = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/verified-properties");
      return res.data;
    },
  });

  return [properties, refetch];
};

export default useVerifiedProperties;
