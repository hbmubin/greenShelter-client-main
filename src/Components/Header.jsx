import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import useRole from "../Hooks/useRole";

const Header = () => {
  const { user, loading, logOut } = useContext(AuthContext);

  const [role, isRoleLoading] = useRole();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink className="hover:text-orange-400 duration-300" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:text-orange-400 duration-300"
          to="/all-properties"
        >
          All properties
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:text-orange-400 duration-300"
          to={`${
            role == "agent"
              ? "/dashboard/agent-profile"
              : role == "admin"
              ? "/dashboard/admin-profile"
              : "/dashboard/user-profile"
          }`}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const navEnd = (
    <>
      {loading ? (
        <>
          <span className="loading loading-ring loading-lg"></span>
        </>
      ) : (
        <>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-200 py-1 px-2 rounded-full bg-opacity-20">
                <div>{user.displayName}</div>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className="py-3 px-5  rounded-3xl bg-orange-400 hover:bg-orange-300 duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                className="py-3 px-5 rounded-s-3xl bg-orange-400 hover:bg-orange-300 duration-300"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="py-3 px-5  rounded-e-3xl bg-orange-400 hover:bg-orange-300 duration-300"
                to="/register"
              >
                Register
              </NavLink>
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <header className="navbar px-6 bg-opacity-80 fixed z-50 py-3 text-white bg-[#0D263C]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#0D263C] rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <a className="font-semibold  text-2xl">
          <span className="text-green-500">Green</span> Shelter
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu text-lg  menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">{navEnd}</div>
    </header>
  );
};

export default Header;
