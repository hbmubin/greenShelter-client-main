import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAgentSoldPropertiesStats = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    isLoading,
    data: stats,
    error,
    refetch,
  } = useQuery({
    queryKey: ["agentSoldPropertiesStats", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/admin/agent-sold-properties-stats/${user.email}`
      );
      return response.data;
    },
    enabled: !!user.email,
  });

  return {
    isLoading,
    stats,
    error,
    refetch,
  };
};

export default useAgentSoldPropertiesStats;
