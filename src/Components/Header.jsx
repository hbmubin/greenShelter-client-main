import { NavLink } from "react-router-dom";

const Header = () => {
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
        <NavLink className="hover:text-orange-400 duration-300" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="navbar px-6 py-3 text-white bg-[#0D263C]">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
      <div className="navbar-end">
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
      </div>
    </header>
  );
};

export default Header;
