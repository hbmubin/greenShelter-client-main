import { useEffect, useState } from "react";

const useVerifiedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/verified-properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setPropertiesLoading(false);
      });
  }, []);

  return [properties, propertiesLoading];
};

export default useVerifiedProperties;
