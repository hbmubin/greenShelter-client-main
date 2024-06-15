import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";

const useUserPropertiesBought = () => {
  const { user } = useContext(AuthContext);
  const [propertiesBought, setPropertiesBought] = useState([]);
  const [propertyLoading, setPropertyLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/user-properties-bought/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setPropertiesBought(data);
          setPropertyLoading(false);
        });
    }
  }, [user]);

  return [propertiesBought, propertyLoading];
};

export default useUserPropertiesBought;
