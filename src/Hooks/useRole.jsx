import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: role, isPending: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-role/${user?.email}`);
      // console.log(res.data.role);
      return res.data.role;
    },
  });
  return [role, isRoleLoading];
};

export default useRole;
