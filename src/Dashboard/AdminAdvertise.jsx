import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useVerifiedProperties from "../Hooks/useVerifiedProperties";

const AdminAdvertise = () => {
  const { loading } = useContext(AuthContext);
  const [properties, refetch, isPending] = useVerifiedProperties();
  const axiosSecure = useAxiosSecure();

  if (loading || isPending) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  //   console.log(properties);

  const handleAdvertise = (id) => {
    axiosSecure.patch(`/admin/advertise-property/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        // console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Advertised",
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
          <tbody>
            {properties?.map((property) => (
              <tr key={property._id}>
                <td>
                  <img
                    className="w-12 rounded-md"
                    src={property.propertyImage}
                    alt=""
                  />
                </td>
                <td>{property.propertyTitle}</td>
                <td>{property.agentName}</td>
                <td>
                  {property.priceRange.map((p, idx) => (
                    <span key={idx}>
                      ${p}
                      {idx === 0 && " - "}
                    </span>
                  ))}
                </td>
                <th className="text-center">
                  {property.advertised !== "true" ? (
                    <button
                      onClick={() => handleAdvertise(property._id)}
                      className="btn rounded-3xl bg-blue-400 text-white"
                    >
                      Advertise
                    </button>
                  ) : (
                    <span className="text-green-400">Advertised</span>
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

export default AdminAdvertise;
