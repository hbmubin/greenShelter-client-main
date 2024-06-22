import { useState, useEffect, useContext } from "react";
import PropertiesCard from "../Components/PropertiesCard";
import useVerifiedProperties from "../Hooks/useVerifiedProperties";
import { AuthContext } from "../Providers/AuthProvider";

const AllProperties = () => {
  const [properties, refetch, isPending] = useVerifiedProperties();
  const { loading } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProperties(properties);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = properties.filter((property) =>
        property.propertyLocation.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredProperties(filtered);
    }
  }, [searchTerm, properties]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isPending || loading) {
    return (
      <div className="flex w-full py-28 items-center justify-center">
        <span className="loading loading-ring w-28"></span>
      </div>
    );
  }

  return (
    <div className="px-6 py-[15vh]">
      <div className="flex justify-center my-8">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-3xl w-full max-w-sm"
        />
      </div>
      <div className="grid lg:grid-cols-4  gap-4 md:grid-cols-3 bg-gray-100">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertiesCard property={property} key={property._id} />
          ))
        ) : (
          <p className="text-center text-gray-600">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
