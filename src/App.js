import { Link, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "./redux-stuff/actions";
import SignupForm from "./components/SignupForm";
import Timeline from "./components/Timeline";
import NewPost from "./components/NewPost";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import MyPosts from "./components/MyPosts";

function App() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div className="allContent max-w-3xl mx-auto ">
      <header className="flex items-center justify-between mb-4 py-4">
        <h1 className="font-bold text-lg">
          <Link className="p-2 pl-0 block" to="/">
            Teritori
          </Link>
        </h1>
        <nav>
          <Link className="p-2" to="/son-postlar">
            Discover
          </Link>
          <Link className="p-2" to="/yeni-post">
            Post
          </Link>
          <Link className="p-2" to={`/kullanici/${user ? user.user.id : "-1"}`}>
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
      <main className="max-w-xl  mx-auto ">
        <Switch>
          <Route exact path="/">
            <section className="py-16 px-8 text-center bg-white shadow-lg">
              <h2 className="text-xl font-bold mb-2">Welcome to Teritori!</h2>
              <p>Sign up to see what's happening around you</p>
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
