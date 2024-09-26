import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import "./Navbar.css";
import logo from "../../../public/assets/logo.png";
import { useContext } from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  // console.log(user);
  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((err) => console.error(err));
  };
  const links = (
    <>
      <li>
        <NavLink className="navText text-xl font-bold" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="navText text-xl font-bold" to="/addFood">
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink className="navText text-xl font-bold" to="/availableFood">
          Available Food
        </NavLink>
      </li>
      <li>
        <NavLink className="navText text-xl font-bold" to="/myFood">
          Manage Food
        </NavLink>
      </li>
      <li>
        <NavLink className="navText text-xl font-bold" to="/foodRequest">
          Food Request
        </NavLink>
      </li>
      {user?.email ? (
        <li>
          {" "}
          <button
            onClick={handleLogout}
            className="navText text-xl font-bold border  border-slate-950 hover:bg-slate-900 hover:text-slate-50"
          >
            Log out
          </button>{" "}
        </li>
      ) : (
        <li>
          <NavLink className="navText text-xl font-bold" to="/login">
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  // const profile = (
  //   <>
  //     <li>
  //       <NavLink to="/addfood">Add a Food Iteams</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to="/addedfood">My added food items</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to="/orderedfood">My ordered food items</NavLink>
  //     </li>
  //   </>
  // );
  return (
    <div className="shadow-2xl">
      <div className="navbar navBG px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <Link>
            <img className="h-[80px] rounded-full" src={logo} alt="" />
            {/* <h2 className="text-xl font-semibold text-orange-500 hidden md:block">Bangla Bites</h2> */}
          </Link>
          {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
