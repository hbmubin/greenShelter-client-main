import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAgentProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    data: properties = [],
    isPending,
  } = useQuery({
    queryKey: ["agentProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/properties/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return [properties, refetch, isPending];
};

export default useAgentProperties;
