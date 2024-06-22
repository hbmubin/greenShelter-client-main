import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAdminAllProperties from "../Hooks/useAdminAllProperties";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminProperties = () => {
  const { loading } = useContext(AuthContext);
  const [properties, refetch, isPending] = useAdminAllProperties();
  const axiosSecure = useAxiosSecure();

  if (loading || isPending) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  //   console.log(properties);

  const handleVerify = (id) => {
    axiosSecure.patch(`/admin/verify-property/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Verified",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleReject = (id) => {
    axiosSecure.patch(`/admin/reject-property/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rejected",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="text-center py-14 text-3xl font-semibold">
        <h1>All Properties {`(${properties.length})`}</h1>
      </div>
      <div className="overflow-x-auto w-11/12 mx-auto border-[1px] rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Agent Name</th>
              <th>Agent Email</th>
              <th>Price Range</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {properties?.map((property) => (
              <tr key={property._id}>
                <td>{property.propertyTitle}</td>
                <td>{property.propertyLocation}</td>
                <td>{property.agentName}</td>
                <td>{property.agentEmail}</td>
                <td>
                  {property.priceRange.map((p, idx) => (
                    <span key={idx}>
                      ${p}
                      {idx === 0 && " - "}
                    </span>
                  ))}
                </td>
                <th className="text-center border-l-2">
                  {property.propertyStatus == "pending" ? (
                    <>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleVerify(property._id)}
                          className="btn rounded-3xl text-white bg-green-400"
                        >
                          verify
                        </button>
                        <button
                          onClick={() => handleReject(property._id)}
                          className="btn rounded-3xl text-white bg-orange-500"
                        >
                          reject
                        </button>
                      </div>
                    </>
                  ) : (
                    property.propertyStatus
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

export default AdminProperties;
