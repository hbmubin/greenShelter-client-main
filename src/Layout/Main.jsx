import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Main = () => {
  return (
    <div className="">
      <Header></Header>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
