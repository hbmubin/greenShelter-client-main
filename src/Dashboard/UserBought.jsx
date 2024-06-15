import { useEffect, useState } from "react";
import useUserPropertiesBought from "../Hooks/useUserPropertiesBought";
import UserBoughtCard from "./UserBoughtCard";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const UserBought = () => {
  const [propertiesBought, propertyLoading] = useUserPropertiesBought();
  const axiosPublic = useAxiosPublic();
  const [properties, setProperties] = useState([]);
  const [boughtPropertyInfo, setBoughtPropertyInfo] = useState([]);

  useEffect(() => {
    if (propertiesBought.length > 0) {
      const fetchProperties = async () => {
        const propertyPromises = propertiesBought.map((property) =>
          axiosPublic
            .get(`http://localhost:5000/property/${property.propertyId}`)
            .then((response) => response.data)
        );

        const propertyData = await Promise.all(propertyPromises);
        setProperties(propertyData);
      };

      fetchProperties();
    }
  }, [propertiesBought, axiosPublic]);

  useEffect(() => {
    const mergedProperties = propertiesBought
      .map((propertyBought) => {
        const property = properties.find(
          (p) => p._id === propertyBought.propertyId
        );
        return property ? { ...property, ...propertyBought } : null;
      })
      .filter(Boolean);

    setBoughtPropertyInfo(mergedProperties);
  }, [properties, propertiesBought]);

  if (propertyLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  //   console.log(boughtPropertyInfo);
  return (
    <div>
      <div className="text-center mt-6 mb-10 ">
        <h2 className="text-3xl font-semibold">
          Properties I Bought {`(${boughtPropertyInfo.length})`}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
        {boughtPropertyInfo.map((property) => (
          <UserBoughtCard
            key={property.propertyId}
            boughtPropertyInfo={property}
          />
        ))}
      </div>
    </div>
  );
};

export default UserBought;
