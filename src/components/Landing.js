import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Landing() {
  const user = useSelector((store) => store.user);

  return (
    <Route exact path="/">
      <section className="py-16 px-8 text-center bg-[#F8F5F0] shadow-lg rounded-xl flex-col max-w-5xl w-1/2 mx-auto">
        <h2 className="text-4xl font-bold mb-4">Welcome to Teritori!</h2>
        <p>Sign up to see what's happening around you</p>
        <Link to="/kayit-ol">
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
        <img src="/images/login.jpg" alt="login-img" />
      </section>
    </Route>
  );
}

export default Landing;
