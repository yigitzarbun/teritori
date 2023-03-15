import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { LOGOUT } from "../redux-stuff/actions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Header(props) {
  const { handleSearch, searchTerm, clearSearch } = props;
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // Handlers >>>
  const notifyLogin = () => {
    if (user == null) {
      toast.error("You must login to access this page");
    }
  };
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  const redirectSearch = () => {
    history.push("/son-postlar");
    handleSearch(searchTerm);
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-4 py-4">
        <h1 className="font-bold text-3xl">
          <Link
            className="p-2 pl-0 flex items-center"
            to={user ? "/son-postlar" : "/"}
          >
            <img src="/images/logo.png" alt="logo" className="w-8 h-8 mr-2" />
            teritori
          </Link>
        </h1>
        <nav className=" nav flex justify-between w-2/3 items-center">
          <NavLink
            className=" p-2 text-gray-800 hover:text-black"
            to="/son-postlar"
            activeClassName="active-link"
          >
            Discover
          </NavLink>
          <NavLink
            className="p-2 text-gray-800 hover:text-black"
            to="/yeni-post"
            onClick={notifyLogin}
            activeClassName="active-link"
          >
            Post
          </NavLink>
          {user && (
            <NavLink
              className="p-2 text-gray-800 hover:text-black"
              to={`/kullanici/${user ? user.user_id : "-1"}`}
              onClick={notifyLogin}
              activeClassName="active-link"
            >
              {user && (
                <div className="flex">
                  <img
                    src={user.avatarUrl ? user.avatarUrl : "/images/logo.png"}
                    alt="logo"
                    className="rounded-full w-6 h-6 mr-2"
                  />
                  <p>{user.username}</p>
                </div>
              )}
            </NavLink>
          )}
          <NavLink
            className="p-2 text-gray-800 hover:text-black"
            to="/users"
            onClick={notifyLogin}
            activeClassName="active-link"
          >
            Users
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
              className="block text-gray-800 hover:text-black"
            >
              Log out
            </button>
          ) : (
            <>
              {" "}
              <NavLink
                className="p-2 text-gray-800 hover:text-black"
                activeClassName="active-link"
                to="/giris"
              >
                Log in
              </NavLink>
              <NavLink
                className="p-2 text-gray-800 hover:text-black"
                to="/kayit-ol"
                activeClassName="active-link"
              >
                Sign up
              </NavLink>{" "}
            </>
          )}
        </nav>
      </header>
      {user && (
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            name="search"
            id="search"
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search in teritori"
            className="shadow-md bg-[#F8F5F0] rounded-full pl-2 py-2 w-full mr-8"
          />
          <div className="w-1/3 flex justify-between">
            <button
              onClick={redirectSearch}
              className="bg-black hover:bg-blue-600  text-white block px-3 w-3/8 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl	"
            >
              Search
            </button>
            <button
              className="bg-black hover:bg-blue-600  text-white block px-3 w-3/8 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl	"
              onClick={clearSearch}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
