import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginWith } from "../redux-stuff/actions";

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
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="signupForm max-w-sm mx-auto bg-white shadow p-8"
    >
      <h1 className="text-2xl text-center mb-4">Log in</h1>
      <div>
        <label className="block" htmlFor="email">
          Email
          {errors.email && (
            <span className="fieldError">{errors.email.message}</span>
          )}
        </label>
        <input
          {...register("email", { required: "Email girmelisin" })}
          id="email"
          placeholder="örneğin johndoe@somewhere.com"
        />
      </div>

      <div>
        <label>
          Şifre
          {errors.password && (
            <span className="fieldError">{errors.password.message}</span>
          )}
        </label>
        <input
          {...register("password", {
            required: "Şifre boş bırakılamaz",
            minLength: { value: 4, message: "Şifre 4 karakterden kısa olamaz" },
          })}
          type="password"
          id="password"
          className="border p-2"
        />
      </div>

      <button type="submit" disabled={!isValid}>
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
