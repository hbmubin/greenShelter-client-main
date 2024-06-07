import { IoChevronBackSharp } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-56 min-h-screen bg-[#0D263C] flex flex-col justify-between">
        <ul className="menu text-[16px] p-0 ">
          <li className="flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
            <NavLink to="/dashboard/user-profile">My Profile</NavLink>
          </li>
          <li className="flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
            <NavLink to="/dashboard/user-wishlist">My Wishlist</NavLink>
          </li>
          <li className="flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
            <NavLink to="/dashboard/user-bought">Property Bought</NavLink>
          </li>
          <li className="flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
            <NavLink to="/dashboard/user-Reviews">My Reviews</NavLink>
          </li>
        </ul>
        <ul className="menu text-[16px] p-0 ">
          <li className="flex justify-center items-center rounded-none font-semibold text-[#0D263C] border-t-2 bg-orange-400 border-t-gray-600">
            <div>
              <span>
                <IoChevronBackSharp />
              </span>
              <span>
                <NavLink to="/">Back to Home</NavLink>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
