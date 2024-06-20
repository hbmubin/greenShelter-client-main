import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const PropertiesCard = ({ property }) => {
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
          <div className="text-green-400 text-lg mr-4">{propertyStatus}</div>
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
        <div className="card-actions">
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

export default PropertiesCard;
