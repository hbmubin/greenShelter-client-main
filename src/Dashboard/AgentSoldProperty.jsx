import { useContext } from "react";
import useAgSold from "../Hooks/useAgSold";
import { AuthContext } from "../Providers/AuthProvider";

const AgentSoldProperty = () => {
  const [soldProperties, refetch, isPending] = useAgSold();
  const { loading } = useContext(AuthContext);
  if (loading || isPending) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="text-center py-14 text-3xl font-semibold">
        <h1>My Sold Property {`(${soldProperties.length})`}</h1>
      </div>
      <div className="overflow-x-auto w-11/12 mx-auto border-[1px] rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((property) => (
              <tr key={property._id}>
                <td>{property.propertyTitle}</td>
                <td>{property.propertyLocation}</td>
                <td>{property.buyerEmail}</td>
                <td>{property.buyerName}</td>
                <th>{property.soldPrice}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentSoldProperty;
