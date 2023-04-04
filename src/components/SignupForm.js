import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function SignupForm() {
  const districts = useSelector((store) => store.districts);
  /*
  const axiosWithAuth = () => {
    const tokenObj = JSON.parse(localStorage.getItem("teritoriToken"));
    const token = tokenObj.token;
    return axios.create({
      headers: {
        Authorization: token,
      },
    });
  };
  */
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const history = useHistory();

  function handleSignupForm(data) {
    const dataWide = {
      ...data,
      signup_date: format(new Date(), "dd/MM/yyyy"),
    };
    delete dataWide.password2;
    axios
      .post("http://localhost:9000/api/auth/register", dataWide)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Register successful!");
          history.push("/giris");
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSignupForm)}
        className="signupForm max-w-sm mx-auto bg-white shadow p-8 rounded-xl	"
      >
        <h1 className="text-2xl text-center mb-2">Sign up</h1>
        <p className="text-xs mb-4 text-blue-600">* Required fields</p>
        <div>
          <label className="block" htmlFor="email">
            Email*
            {errors.email && (
              <span className="fieldError">{errors.email.message}</span>
            )}
          </label>
          <input
            {...register("email", { required: "You must enter an email" })}
            id="email"
            placeholder="e.g. johndoe@somewhere.com"
          />
        </div>
        <div>
          <label className="block" htmlFor="username">
            Username*
            {errors.username && (
              <span className="fieldError">{errors.username.message}</span>
            )}
          </label>
          <input
            {...register("username", { required: "You must set a username" })}
            id="username"
            placeholder="e.g. chatoic_potato"
            type="text"
          />
        </div>
        <div>
          <label className="block" htmlFor="district">
            District*
            {errors.district && (
              <span className="fieldError">{errors.district.message}</span>
            )}
          </label>
          <select
            name="district"
            {...register("district", { required: "Select a district" })}
          >
            <option value="">--Select your district--</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block" htmlFor="avatarUrl">
            Picture
          </label>
          <input
            {...register("avatarUrl")}
            id="avatarUrl"
            placeholder="e.g. https://fastly.picsum.photos/id/972/200/300.jpg?hmac=UMf5f6BV9GkLiz0Xz9kMwm1riiTtlpIG2jt0WrxZ51Q"
          />
        </div>
        <div>
          <label>
            Password*
            {errors.password && (
              <span className="fieldError">{errors.password.message}</span>
            )}
          </label>
          <input
            {...register("password", {
              required: "You must set a password",
              minLength: {
                value: 4,
                message: "Password length must be more than 4 characters",
              },
            })}
            type="password"
            id="password"
            className="border p-2"
          />
        </div>
        <div>
          <label>
            Repeat password*
            {errors.password2 && (
              <span className="fieldError">{errors.password2.message}</span>
            )}
          </label>
          <input
            {...register("password2", {
              required: "You must set a password",
              minLength: {
                value: 4,
                message: "Password length must be more than 4 characters",
              },
              validate: {
                passEqual: (value) =>
                  value === getValues().password || "Passwords don't match",
              },
            })}
            type="password"
            id="password2"
            className="border p-2"
          />
        </div>
        <button type="submit" disabled={!isValid}>
          Sign up
        </button>
      </form>
      <div className=" max-w-sm mx-auto	flex justify-center">
        <Link to="/giris">
          <p className="mb-10">
            Do you have an account? {""}
            <span className="text-blue-600	font-bold ">Log in</span>
          </p>
        </Link>
      </div>
    </>
  );
}

export default SignupForm;
