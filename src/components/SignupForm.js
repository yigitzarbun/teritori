import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const history = useHistory();

  function handleSignupForm(data) {
    const gonderilecekVeri = { ...data };
    delete gonderilecekVeri.password2;
    axios
      .post("  http://localhost:5000/users", gonderilecekVeri)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data.accessToken, response.data.user);
          toast.success("Register successful!");
          history.push("/giris");
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignupForm)}
      className="signupForm max-w-sm mx-auto bg-white shadow p-8"
    >
      <h1 className="text-2xl text-center mb-4">Sign up</h1>
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
        <label className="block" htmlFor="username">
          Kullanıcı Adı
          {errors.username && (
            <span className="fieldError">{errors.username.message}</span>
          )}
        </label>
        <input
          {...register("username", { required: "Kullanıcı adı seçmelisin" })}
          id="username"
          placeholder="örneğin chatoic_potato"
          type="text"
        />
      </div>
      <div>
        <label className="block" htmlFor="avatarUrl">
          Avatar URL
        </label>
        <input
          {...register("avatarUrl")}
          id="avatarUrl"
          placeholder="örneğin https://fastly.picsum.photos/id/972/200/300.jpg?hmac=UMf5f6BV9GkLiz0Xz9kMwm1riiTtlpIG2jt0WrxZ51Q"
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
      <div>
        <label>
          Şifre tekrar{" "}
          {errors.password2 && (
            <span className="fieldError">{errors.password2.message}</span>
          )}
        </label>
        <input
          {...register("password2", {
            required: "Şifre boş bırakılamaz",
            minLength: { value: 4, message: "Şifre 4 karakterden kısa olamaz" },
            validate: {
              passEqual: (value) =>
                value === getValues().password || "Şifreler eşleşmiyor",
            },
          })}
          type="password"
          id="password2"
          className="border p-2"
        />
      </div>
      <button type="submit" disabled={!isValid}>
        Kayıt ol
      </button>
    </form>
  );
}

export default SignupForm;
