import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserBoughtInfo = () => {
  const { user } = useContext(AuthContext);
  const [propertiesBought, setPropertiesBought] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/user-properties-bought/${user.email}`)
        .then((response) => {
          setPropertiesBought(response.data);
        })
        .finally(() => {
          setPropertiesLoading(false);
        });
    }
  }, [user, axiosSecure]);

  return [propertiesBought, propertiesLoading];
};

export default useUserBoughtInfo;
