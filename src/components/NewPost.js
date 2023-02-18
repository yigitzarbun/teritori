import React from "react";
import { useForm } from "react-hook-form";
import { addPost } from "../redux-stuff/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function NewPost() {
  const user = useSelector((store) => store.user);
  const userId = user.user.id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  function handleAddPost(data) {
    const dataWide = {
      ...data,
      userId: userId,
    };
    dispatch(addPost(dataWide));
    reset();
  }

  return (
    <form
      className="newPostForm max-w-md mx-auto bg-white shadow p-8"
      onSubmit={handleSubmit(handleAddPost)}
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
