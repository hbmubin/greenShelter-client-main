import { FaHome } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();
  if (!role && loading) {
    return (
      <div className="flex w-full py-28 items-center justify-center">
        <span className="loading loading-ring w-28"></span>
      </div>
    );
  }

  return (
    <div className="md:flex">
      <div className="md:w-56   md:min-h-screen md:fixed bg-[#0D263C] flex flex-col justify-between">
        <ul className="menu text-[16px] p-0 grid grid-cols-2 md:block">
          {role == "agent" ? (
            <>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/agent-profile">My Profile</NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/agent-addProperty">
                  Add Property
                </NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/agent-addedProperty">
                  My Added Property
                </NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/agent-soldProperty">
                  My Sold Property
                </NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/agent-requestedProperty">
                  Requested Property
                </NavLink>
              </li>
            </>
          ) : role == "admin" ? (
            <>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/admin-profile">My Profile</NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/admin-properties">
                  Manage Properties
                </NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/admin-users">Manage Users</NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/admin-reviews">Manage reviews</NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/admin-advertise">
                  Advertise Property
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="md:border-x-0  border-x-[1px]  border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/user-profile">My Profile</NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/user-wishlist">My Wishlist</NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/user-bought">Property Bought</NavLink>
              </li>
              <li className="md:border-x-0  border-x-[1px] border-x-gray-600 flex justify-center items-center rounded-none text-white border-b-[1px] border-b-gray-600">
                <NavLink to="/dashboard/user-reviews">My Reviews</NavLink>
              </li>
            </>
          )}
        </ul>
        <ul className="menu max-h-screen text-[16px] p-0 ">
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
      <div className="flex-1 md:ml-56  overflow-x-auto overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
