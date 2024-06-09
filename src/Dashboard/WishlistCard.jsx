import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import useUserWishlist from "../Hooks/useUserWishlist";

const WishlistCard = ({ property }) => {
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useUserWishlist();

  const { user } = useContext(AuthContext);
  const {
    propertyImage,
    propertyTitle,
    propertyLocation,
    agentName,
    agentImage,
    priceRange,
    status,
  } = property;

  const handleRemoveWishlist = () => {
    axiosPublic
      .delete(`/remove-wishlist/${user.email}/${property._id}`)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Remove successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const liner = {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(138,138,138,0) 46%, rgba(0,0,0,1) 100%)",
  };
  return (
    <div className="card duration-300 rounded-3xl bg-base-100 border-[1px] shadow-md">
      <figure className="mx-4 mt-4 relative overflow-hidden">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          className=" rounded-3xl "
        />
        <div
          style={liner}
          className=" absolute h-full w-full flex justify-between items-end  rounded-3xl"
        >
          <div className="ml-2 mb-2 text-white">
            {priceRange.map((p, idx) => (
              <span key={idx}>
                ${p}
                {idx === 0 && " - "}
              </span>
            ))}
          </div>
          <div className="text-green-400 mb-2 text-lg mr-4">{status}</div>
        </div>
      </figure>
      <div className="card-body flex text-center justify-center">
        <h2 className="card-title flex text-center justify-center">
          {propertyTitle}
        </h2>
        <div className="flex items-center text-center justify-center">
          <div className="flex items-center  gap-2">
            <MdLocationOn size={24} color="orange"></MdLocationOn>
            <p>{propertyLocation}</p>
          </div>
        </div>
        <div className="bg-gray-100 w-full p-2 flex gap-4 items-center  rounded-3xl">
          <div className="w-14 rounded-full overflow-hidden">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
          <div>
            <div className="font-medium text-neutral-600">Agent:</div>
            <div className="font-medium">{agentName}</div>
          </div>
        </div>

        <div className="card-actions flex text-center justify-center">
          <Link
            className="btn rounded-full bg-orange-400 text-white"
            to={`/dashboard/make-offer/${property._id}`}
          >
            Make an offer
          </Link>
          <button
            className="btn rounded-full bg-red-400 text-white"
            onClick={handleRemoveWishlist}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
