import { FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import PropertyReviews from "../Components/PropertyReviews";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const property = useLoaderData();
  const {
    propertyImage,
    propertyTitle,
    propertyLocation,
    agentName,
    agentImage,
    priceRange,
    propertyDescriptions,
  } = property;

  const handleAddWishlist = () => {
    const wishList = { propertyId: property._id };
    axiosPublic.post(`/add-wishlist/${user.email}`, wishList).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Property added to Wishlist",
          showConfirmButton: false,
          timer: 1500,
        });
      } else
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        });
    });
  };
  return (
    <div className="py-[15vh]">
      <div className="px-6">
        <div className="w-11/12 mx-auto">
          <div className=" rounded-3xl overflow-hidden">
            <img className="w-full" src={propertyImage} />
          </div>
          <div className=" text-white  mt-6">
            <div className="lg:flex justify-between items-center bg-[#0D263C]  px-4 py-4   rounded-t-3xl">
              <div className="mb-8 lg:mb-0">
                <h2 className="text-5xl">{propertyTitle}</h2>
                <div className="flex gap-1 mt-12">
                  <MdLocationOn size={20} color="orange"></MdLocationOn>
                  <span>{propertyLocation}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <FaUser size={18} color="orange"></FaUser>
                  <span>Agent : {agentName}</span>
                </div>
              </div>
              <div className="">
                <div className="text-orange-400 text-lg mb-4">
                  <p>Price Range</p>
                  {priceRange.map((p, idx) => (
                    <span key={idx}>
                      ${p}
                      {idx === 0 && " - "}
                    </span>
                  ))}
                </div>
                <div>
                  <button
                    onClick={handleAddWishlist}
                    className="btn rounded-3xl bg-orange-400 border-none text-white"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 text-[#0D263C] px-4 py-4  rounded-b-3xl">
              <div>
                <h2 className="font-medium mt-2">Description :</h2>
                <p>{propertyDescriptions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PropertyReviews property={property}></PropertyReviews>
    </div>
  );
};

export default PropertyDetails;
