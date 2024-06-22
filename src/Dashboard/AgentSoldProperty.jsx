import { useContext } from "react";
import useAgSold from "../Hooks/useAgSold";
import { AuthContext } from "../Providers/AuthProvider";
import useAgentPropertiesStats from "../Hooks/useAgentPropertiesStats";

const AgentSoldProperty = () => {
  const [soldProperties, refetch, isPending] = useAgSold();
  const { isLoading, stats, error } = useAgentPropertiesStats();
  useAgentPropertiesStats();
  const { user, loading } = useContext(AuthContext);
  if (loading || isPending || isLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  console.log(stats);
  return (
    <div className="min-h-screen">
      <div className="text-center py-12 text-3xl font-semibold">
        <h1>My Sold Property</h1>
      </div>
      <div className="w-80 mx-auto flex justify-between pb-4 text-md font-semibold">
        <div>Total Income : ${stats?.totalAmount}</div>
        <div>Property Sold : {stats?.totalCount}</div>
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
            {soldProperties?.map((property) => (
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
