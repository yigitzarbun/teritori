import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginWith } from "../redux-stuff/actions";
import { Link } from "react-router-dom";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const history = useHistory();

  function handleLogin(data) {
    dispatch(loginWith(data, history));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="signupForm max-w-sm mx-auto bg-white shadow p-8 rounded-xl"
      >
        <h1 className="text-2xl text-center mb-4">Log in</h1>
        <div>
          <label className="block" htmlFor="email">
            Username
            {errors.username && (
              <span className="fieldError">{errors.username.message}</span>
            )}
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            id="username"
            placeholder="e.g. user123"
          />
        </div>

        <div>
          <label>
            Password
            {errors.password && (
              <span className="fieldError">{errors.password.message}</span>
            )}
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Min 4 characters",
              },
            })}
            type="password"
            id="password"
            className="border p-2"
          />
        </div>

        <button type="submit" disabled={!isValid}>
          Log in
        </button>
      </form>
      <div className=" max-w-sm mx-auto	flex justify-center">
        <Link to="/kayit-ol">
          <p className="mb-10">
            Don't have an account?{" "}
            <span className="text-blue-600	font-bold ">Sign up</span>
          </p>
        </Link>
      </div>
    </>
  );
}

export default LoginForm;
