import { useEffect, useState } from "react";

const useAdvertised = () => {
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  useEffect(() => {
    fetch("https://green-shelter-server-a-12.vercel.app/advertised-properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setPropertiesLoading(false);
      });
  }, []);

  return [properties, propertiesLoading];
};

export default useAdvertised;
