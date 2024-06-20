import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const AdvertisedCard = ({ property }) => {
  const {
    propertyImage,
    propertyTitle,
    propertyLocation,
    agentName,
    agentImage,
    priceRange,
    propertyStatus,
  } = property;

  const liner = {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(138,138,138,0) 46%, rgba(0,0,0,1) 100%)",
  };
  return (
    <div className="card  hover:scale-105 duration-300 rounded-3xl bg-base-100 border-[1px] shadow-md">
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
          <div className="text-green-400 mb-2 text-lg mr-4">
            {propertyStatus}
          </div>
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

        <div className="card-actions flex text-center justify-center">
          <Link
            className="btn rounded-full bg-orange-400 text-white"
            to={`/property/${property._id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvertisedCard;
