import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
function NewPost() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  function addPost(data) {
    axios
      .post("http://localhost:5000/posts", data)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Post successful!");
          reset();
        }
      })

      .catch((error) => console.log(error));
  }

  return (
    <form
      className="newPostForm max-w-md mx-auto bg-white shadow p-8"
      onSubmit={handleSubmit(addPost)}
    >
      <h1 className="text-2xl text-center mb-4">New Post</h1>
      <div>
        <label className="block" htmlFor="body">
          What are you thinking?
          {errors.body && (
            <span className="fieldError">{errors.body.message}</span>
          )}
        </label>
        <textarea
          {...register("body", {
            required: "Write something",
          })}
          name="body"
          id="body"
          rows="6"
        ></textarea>
        <button type="submit" disabled={!isValid}>
          Post
        </button>
      </div>
    </form>
  );
}

export default NewPost;
