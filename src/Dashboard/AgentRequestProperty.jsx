import { useContext } from "react";
import useAgentRequest from "../Hooks/useAgentRequest";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAgentOffered from "../Hooks/useAgentOffered";

const AgentRequestProperty = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [offeredProperties, offeredLoading, error, offeredRefetch] =
    useAgentOffered();
  const [properties, propertiesLoading, refetch] = useAgentRequest();
  // console.log(properties);
  if (loading || propertiesLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const handleAccept = (offerId, propertyId) => {
    // console.log(offerId);
    axiosSecure.post(`/agent/accept/${offerId}/${propertyId}`).then(
      (res) => offeredRefetch(),
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Accepted",
        showConfirmButton: false,
        timer: 1500,
      })
    );
  };
  const handleReject = (offerId) => {
    // console.log(offerId);
    axiosSecure.post(`/agent/reject/${offerId}`).then(
      (res) => offeredRefetch(),
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Rejected",
        showConfirmButton: false,
        timer: 1500,
      })
    );
  };

  return (
    <div className="min-h-screen">
      <div className="text-center py-14 text-3xl font-semibold">
        <h1>Requested Property {`(${properties.length})`}</h1>
      </div>
      <div className="overflow-x-auto w-11/12 mx-auto border-[1px] rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Offered Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, idx) => (
              <tr key={idx}>
                <td>{property.propertyTitle}</td>
                <td>{property.propertyLocation}</td>
                <td>{property.info.buyerInfo.buyerEmail}</td>
                <td>{property.info.buyerInfo.buyerName}</td>
                <th>${property.info.offeredAmount}</th>
                <th className="flex justify-center">
                  {property.info.boughtStatus == "pending" ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          handleAccept(
                            property.info.offerId,
                            property.info.propertyId
                          )
                        }
                        className="btn rounded-3xl text-white bg-green-400"
                      >
                        accept
                      </button>
                      <button
                        onClick={() => handleReject(property.info.offerId)}
                        className="btn rounded-3xl text-white bg-orange-500"
                      >
                        reject
                      </button>
                    </div>
                  ) : (
                    <p
                      className={`${
                        property.info.boughtStatus == "accepted"
                          ? "text-green-500"
                          : "text-orange-600"
                      }`}
                    >
                      {property.info.boughtStatus}
                    </p>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentRequestProperty;
