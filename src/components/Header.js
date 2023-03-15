import React from "react";
import { Link, useHistory } from "react-router-dom";
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
          <Link className="p-2 pl-0 block" to={user ? "/son-postlar" : "/"}>
            teritori
          </Link>
        </h1>
        <nav className="flex justify-between w-2/3 items-center">
          <Link className="p-2" to="/son-postlar" onClick={notifyLogin}>
            Discover
          </Link>
          <Link className="p-2" to="/yeni-post" onClick={notifyLogin}>
            Post
          </Link>
          {user && (
            <Link
              className="p-2"
              to={`/kullanici/${user ? user.user_id : "-1"}`}
              onClick={notifyLogin}
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
            </Link>
          )}

          <Link className="p-2" to="/users" onClick={notifyLogin}>
            Users
          </Link>
          {user ? (
            <button onClick={handleLogout} className="block">
              Log out
            </button>
          ) : (
            <>
              {" "}
              <Link className="p-2" to="/giris">
                Log in
              </Link>
              <Link className="p-2" to="/kayit-ol">
                Sign up
              </Link>{" "}
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
