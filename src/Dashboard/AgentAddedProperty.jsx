import { useContext } from "react";
import useAgentProperties from "../Hooks/useAgentProperties";
import { AuthContext } from "../Providers/AuthProvider";
import AgentPropertyCard from "./AgentPropertyCard";

const AgentAddedProperty = () => {
  const { user, loading } = useContext(AuthContext);
  const [properties, refetch, isPending] = useAgentProperties();
  if (loading || isPending) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="text-center py-14 text-3xl font-semibold">
        <h1>My Added Property {`(${properties.length})`}</h1>
      </div>
      <div className="grid lg:grid-cols-3 px-6  gap-4 md:grid-cols-2  ">
        {properties?.map((property) => (
          <AgentPropertyCard
            property={property}
            key={property._id}
          ></AgentPropertyCard>
        ))}
      </div>
    </div>
  );
};

export default AgentAddedProperty;
