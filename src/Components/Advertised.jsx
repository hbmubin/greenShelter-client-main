import useAdvertised from "../Hooks/useAdvertised";
import AdvertisedCard from "./AdvertisedCard";

const Advertised = () => {
  const [properties] = useAdvertised();

  return (
    <div className="py-16">
      <div className="text-center">
        <div className="text-orange-400 mb-4">MOST POPULAR</div>
        <div className="text-5xl font-semibold">Browse Popular</div>
      </div>

      <div className="grid lg:grid-cols-3 px-6 py-[15vh] gap-6 md:grid-cols-2  bg-gray-100">
        {properties?.map((property) => (
          <AdvertisedCard
            property={property}
            key={property._id}
          ></AdvertisedCard>
        ))}
      </div>
    </div>
  );
};

export default Advertised;
