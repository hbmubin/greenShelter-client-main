import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Main = () => {
  return (
    <div className="jost">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
