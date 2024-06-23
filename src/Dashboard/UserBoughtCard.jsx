import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const UserBoughtCard = ({ property }) => {
  const { propertyDetails, propertyId } = property;
  const { offeredAmount, paymentId, boughtStatus } = property;
  const {
    propertyImage,
    propertyTitle,
    propertyLocation,
    agentName,
    agentImage,
    propertyStatus,
  } = propertyDetails;
  // console.log(boughtPropertyInfo);
  // console.log(boughtPropertyInfo.broughtStatus);
  // console.log(paymentId);
  // console.log(property);

  return (
    <div className="card duration-300 rounded-3xl bg-base-100 border-[1px] shadow-md">
      <figure className="mx-4 mt-4 relative overflow-hidden">
        <img src={propertyImage} className="rounded-3xl" alt="Property" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{propertyTitle}</h2>
        <div className="flex items-center gap-2">
          <MdLocationOn size={24} color="orange"></MdLocationOn>
          <p>{propertyLocation}</p>
        </div>
        <div className="bg-gray-100 w-full p-2 flex gap-4 items-center rounded-3xl">
          <div className="w-14 rounded-full overflow-hidden">
            <img src={agentImage} alt="Agent" />
          </div>
          <div>
            <div className="font-medium text-neutral-600">Agent:</div>
            <div className="font-medium">{agentName}</div>
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div>
            <div>Offered amount</div>
            <div className="btn rounded-3xl bg-gray-300">${offeredAmount}</div>
          </div>

          <div>
            <div className="">Status</div>
            <div
              className={`btn rounded-3xl ${
                boughtStatus == "accepted" ? "bg-green-400 text-white" : ""
              } bg-gray-300`}
            >
              {boughtStatus}
            </div>
          </div>
        </div>
        {boughtStatus == "accepted" && (
          <Link
            to={`/dashboard/payment?property=${encodeURIComponent(
              JSON.stringify(property)
            )}`}
          >
            <button className="btn w-full rounded-3xl bg-green-400 text-white mt-4">
              Pay Now
            </button>
          </Link>
        )}
        {boughtStatus == "bought" && (
          <div>
            <h2 className="text-center"> Transaction Id:</h2>
            <button className="btn w-full rounded-3xl text-green-400 bg-gray-200 mt-2">
              {paymentId}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBoughtCard;
