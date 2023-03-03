import { Link, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "./redux-stuff/actions";
import SignupForm from "./components/SignupForm";
import Timeline from "./components/Timeline";
import NewPost from "./components/NewPost";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import MyPosts from "./components/MyPosts";
import DetailedTeri from "./components/DetailedTeri";
import { toast } from "react-toastify";

function App() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  const notifyLogin = () => {
    if (user == null) {
      toast.error("You must login to access this page");
    }
  };
  return (
    <div className="allContent max-w-3xl mx-auto ">
      <header className="flex items-center justify-between mb-4 py-4">
        <h1 className="font-bold text-3xl">
          <Link className="p-2 pl-0 block" to="/">
            teritori
          </Link>
        </h1>
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
      <main>
        <Switch>
          <Route exact path="/">
            <section className="py-16 px-8 text-center bg-[#F8F5F0] shadow-lg rounded-xl flex-col max-w-5xl w-1/2 mx-auto">
              <h2 className="text-4xl font-bold mb-4">
                Welcome {user == null ? "to Teritori!" : user.user.username}
              </h2>
              {user == null ? (
                <p>Sign up to see what's happening around you</p>
              ) : (
                <p>Discover what's happening around</p>
              )}

              {user == null ? (
                <>
                  <Link to="/kayit-ol">
                    {" "}
                    <button className="bg-black hover:bg-blue-600 mt-8 mb-5 text-white block p-3 w-1/2 mx-auto disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl	">
                      Sign Up
                    </button>
                  </Link>
                  <Link to="/giris">
                    <p className="mb-10">
                      Do you have an account?{" "}
                      <span className="text-blue-600	font-bold ">Log in</span>
                    </p>
                  </Link>
                </>
              ) : (
                <Link to="/son-postlar">
                  <button className="bg-black  hover:bg-blue-600 mt-8 mb-10 text-white block p-3 w-1/2 mx-auto disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl	">
                    Go To Feed
                  </button>
                </Link>
              )}

              <img src="/images/login.jpg" alt="login-img" />
            </section>
          </Route>
          <PrivateRoute path="/son-postlar">
            <Timeline />
          </PrivateRoute>
          <PrivateRoute path="/yeni-post">
            {" "}
            <NewPost />{" "}
          </PrivateRoute>
          <PrivateRoute path="/kullanici/:id">
            <MyPosts />
          </PrivateRoute>
          <PrivateRoute path="/post-detay/:id">
            <DetailedTeri />
          </PrivateRoute>

          <Route path="/giris">
            {" "}
            <LoginForm />
          </Route>
          <Route path="/kayit-ol">
            <SignupForm />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
