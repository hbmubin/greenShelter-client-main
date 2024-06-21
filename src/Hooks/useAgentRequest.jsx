import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAgentOffered from "./useAgentOffered";

const fetchPropertyDetails = async (axiosPublic, propertyId) => {
  const res = await axiosPublic.get(`/property/${propertyId}`);
  return res.data;
};

const useAgentRequest = () => {
  const axiosPublic = useAxiosPublic();
  const [offeredProperties, offeredLoading, error, offeredRefetch] =
    useAgentOffered();

  const {
    data: properties = [],
    isLoading: propertiesLoading,
    refetch,
  } = useQuery({
    queryKey: ["agentProperties", offeredProperties],
    queryFn: async () => {
      if (offeredLoading || offeredProperties.length === 0) return [];

      const propertiesData = await Promise.all(
        offeredProperties.map(async (property) => {
          const details = await fetchPropertyDetails(
            axiosPublic,
            property.propertyId
          );
          return { ...details, info: property };
        })
      );

      return propertiesData;
    },
    enabled: !offeredLoading && offeredProperties.length > 0,
  });

  return [properties, propertiesLoading, refetch];
};

export default useAgentRequest;
