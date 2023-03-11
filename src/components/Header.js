import React from "react";
import { Link } from "react-router-dom";
import { LOGOUT } from "../redux-stuff/actions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Header(props) {
  const { handleSearch, searchTerm } = props;
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

  return (
    <div>
      <header className="flex items-center justify-between mb-4 py-4">
        <h1 className="font-bold text-3xl">
          <Link className="p-2 pl-0 block" to={user ? "/son-postlar" : "/"}>
            teritori
          </Link>
        </h1>
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleSearch}
          value={searchTerm}
          placeholder="Search in teritori"
          className="shadow-md rounded-full pl-2"
        />
        <nav className="flex justify-between w-1/2">
          <Link className="p-2" to="/son-postlar" onClick={notifyLogin}>
            Discover
          </Link>
          <Link className="p-2" to="/yeni-post" onClick={notifyLogin}>
            Post
          </Link>
          <Link
            className="p-2"
            to={`/kullanici/${user ? user.user.id : "-1"}`}
            onClick={notifyLogin}
          >
            My Profile
          </Link>
          {user ? (
            <button onClick={handleLogout}>Log out</button>
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
    </div>
  );
}

export default Header;
