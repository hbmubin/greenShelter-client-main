import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAgentProperties from "./useAgentProperties";

const fetchOfferedProperties = async (axiosSecure, properties) => {
  const results = await Promise.all(
    properties.map((property) =>
      axiosSecure.get(`/agent/offered-properties/${property._id}`)
    )
  );
  return results.flatMap((res) => res.data);
};

const useAgentOffered = () => {
  const axiosSecure = useAxiosSecure();
  const [properties, refetch, isPending] = useAgentProperties();

  const {
    data: offeredProperties = [],
    isLoading: offeredLoading,
    error,
    refetch: offeredRefetch,
  } = useQuery({
    queryKey: ["offeredProperties", properties],
    queryFn: () => fetchOfferedProperties(axiosSecure, properties),
    enabled: properties.length > 0,
    retry: false,
  });

  return [offeredProperties, offeredLoading, error, offeredRefetch];
};

export default useAgentOffered;
