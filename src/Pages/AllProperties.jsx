import PropertiesCard from "../Components/PropertiesCard";
import useVerifiedProperties from "../Hooks/useVerifiedProperties";

const AllProperties = () => {
  const [properties, refetch] = useVerifiedProperties();
  return (
    <div className="grid lg:grid-cols-4 px-6 py-[15vh] gap-4 md:grid-cols-3  bg-gray-100">
      {properties?.map((property) => (
        <PropertiesCard property={property} key={property._id}></PropertiesCard>
      ))}
    </div>
  );
};

export default AllProperties;
