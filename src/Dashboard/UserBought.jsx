import UserBoughtCard from "./UserBoughtCard";
import useUserBoughtInfo from "../Hooks/useUserBoughtInfo";
import { useEffect, useState } from "react";

const UserBought = () => {
  const [propertiesBought, propertiesLoading] = useUserBoughtInfo();
  const [boughtPropertyInfo, setBoughtPropertyInfo] = useState([]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const fetchedProperties = await Promise.all(
        propertiesBought.map(async (property) => {
          const res = await fetch(
            `https://green-shelter-server-a-12.vercel.app/property/${property.propertyId}`
          );
          const data = await res.json();
          return { ...property, propertyDetails: data };
        })
      );
      setBoughtPropertyInfo(fetchedProperties);
    };

    if (propertiesBought.length > 0) {
      fetchPropertyDetails();
    }
  }, [propertiesBought]);
  // console.log(propertiesBought);
  if (propertiesLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="text-center mt-6 mb-10 ">
        <h2 className="text-3xl font-semibold">
          Properties I Bought {`(${boughtPropertyInfo.length})`}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
        {boughtPropertyInfo.map((property, idx) => (
          <UserBoughtCard key={idx} property={property} />
        ))}
      </div>
    </div>
  );
};

export default UserBought;
