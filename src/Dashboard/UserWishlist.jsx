import { useContext, useEffect, useState } from "react";
import useUserWishlist from "../Hooks/useUserWishlist";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import WishlistCard from "./WishlistCard";

const UserWishlist = () => {
  const [wishlist, refetch] = useUserWishlist();
  const { loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [properties, setProperties] = useState([]);
  useEffect(() => {
    if (wishlist.length > 0) {
      const fetchProperties = async () => {
        const propertyPromises = wishlist.map((id) =>
          axiosPublic
            .get(`http://localhost:5000/property/${id}`)
            .then((response) => response.data)
        );

        const propertyData = await Promise.all(propertyPromises);
        setProperties(propertyData);
      };

      fetchProperties();
    }
  }, [wishlist, axiosPublic]);
  if (loading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="py-6 text-xl font-semibold ml-6">
        My Wishlist ({properties.length})
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-6">
        {properties.map((property) => (
          <WishlistCard key={property._id} property={property}></WishlistCard>
        ))}
      </div>
    </div>
  );
};

export default UserWishlist;
