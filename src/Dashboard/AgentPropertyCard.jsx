import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import useAgentProperties from "../Hooks/useAgentProperties";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AgentPropertyCard = ({ property }) => {
  const [properties, refetch, isPending] = useAgentProperties();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    propertyImage,
    propertyTitle,
    propertyLocation,
    agentName,
    agentImage,
    priceRange,
    propertyStatus,
  } = property;

  const handleDelete = () => {
    axiosSecure
      .delete(`/property/${property._id}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Property deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting property:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to delete property",
          text: error.message,
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
    <div className="card  hover:scale-[1.01] duration-300 rounded-3xl bg-base-100 border-[1px] shadow-md">
      <figure className="mx-4 mt-4 relative overflow-hidden">
        <img src={propertyImage} className=" w-full rounded-3xl " />
        <div
          style={liner}
          className="absolute h-full w-full flex items-end justify-between rounded-3xl"
        >
          <div className="ml-2 text-white">
            {priceRange.map((p, idx) => (
              <span key={idx}>
                ${p}
                {idx === 0 && " - "}
              </span>
            ))}
          </div>
          <div
            className={`${
              propertyStatus == "verified"
                ? "text-green-400"
                : propertyStatus == "pending"
                ? "text-yellow-300"
                : propertyStatus == "sold"
                ? "text-orange-300"
                : propertyStatus == "rejected" && "text-orange-600"
            } text-lg mr-4`}
          >
            {propertyStatus}
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{propertyTitle}</h2>
        <div className="flex items-center gap-2">
          <MdLocationOn size={24} color="orange"></MdLocationOn>
          <p>{propertyLocation}</p>
        </div>
        <div className="bg-gray-100 w-full p-2 flex gap-4 items-center  rounded-3xl mt-4">
          <div className="w-14 rounded-full overflow-hidden">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
          <div>
            <div className="font-medium text-neutral-600">Agent:</div>
            <div className="font-medium">{agentName}</div>
          </div>
        </div>
        <div className="card-actions flex items-center justify-between mt-2 px-4">
          {propertyStatus !== "sold" && propertyStatus !== "rejected" && (
            <Link
              className="btn rounded-full bg-emerald-400 text-white"
              to={`/dashboard/update-property/${property._id}`}
            >
              Update
            </Link>
          )}
          {propertyStatus !== "sold" && (
            <button
              onClick={handleDelete}
              className="btn rounded-full bg-orange-600 text-white"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentPropertyCard;
