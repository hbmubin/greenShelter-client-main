import Advertised from "../Components/Advertised";
import RecentReviews from "../Components/RecentReviews";
import Slider from "../Components/Slider";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Slider></Slider>
      <Advertised></Advertised>
      <RecentReviews></RecentReviews>
    </div>
  );
};

export default Home;
