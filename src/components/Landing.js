import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Landing() {
  const user = useSelector((store) => store.user);

  return (
    <Route exact path="/">
      <section className="py-16 pr-8 text-center items-center bg-[#F8F5F0] shadow-lg rounded-xl flex justify-between max-w-6xl">
        <img src="/images/login.jpg" alt="login-img" className="w-3/5 mr-4" />
        <div className="flex flex-col justify-between w-2/5">
          <h2 className="text-3xl font-bold mb-8">
            Teritori is what's happening around
          </h2>
          <p className="w-3/4 mx-auto mb-4">
            Sign up to interact with your teritori
          </p>
          <Link to="/kayit-ol">
            <button className="bg-black hover:bg-blue-600 mt-8 mb-6 text-white block p-3 w-1/2 mx-auto disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl	">
              Sign Up
            </button>
          </Link>
          <Link to="/giris">
            <p className="mb-10 text-sm">
              Do you have an account?{" "}
              <span className="text-blue-600	font-bold ">Log in</span>
            </p>
          </Link>
        </div>
      </section>
    </Route>
  );
}

export default Landing;
