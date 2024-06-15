import { FaHome } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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
          <li className="flex justify-center items-center rounded-none font-semibold text-[#0D263C] bg-orange-400">
            <div>
              <span>
                <IoChevronBackSharp />
              </span>
              <span>
                <button onClick={() => navigate(-1)}>Back</button>
              </span>
            </div>
          </li>
          <li className="flex justify-center items-center rounded-none font-semibold text-[#0D263C] border-t-[1px] bg-orange-400 border-t-gray-600">
            <div>
              <span>
                <FaHome />
              </span>
              <span>
                <Link to="/">Home</Link>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
