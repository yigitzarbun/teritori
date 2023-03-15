import React from "react";
import { editPost } from "../redux-stuff/actions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

function EditPost(props) {
  const post_id = props.post_id;
  const dispatch = useDispatch();
  const districts = useSelector((store) => store.districts);
  const user = useSelector((store) => store.user);
  const userId = user.user_id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  function handleEditPost(data) {
    const dataWide = {
      ...data,
      post_id: post_id,
      user_id: userId,
      post_date: format(new Date(), "dd/MM/yyyy"),
    };
    dispatch(editPost(dataWide));
    props.handleEditArea(!props.editArea);
    reset();
  }

  return (
    <form
      className="editPostForm max-w-md mx-auto bg-white shadow p-8 rounded-xl "
      onSubmit={handleSubmit(handleEditPost)}
    >
      <h1 className="text-2xl text-center mb-4">Edit Post</h1>
      <div>
        <label className="block" htmlFor="body">
          What are you thinking?
          {errors.body && (
            <span className="fieldError">{errors.body.message}</span>
          )}
          {errors.title && (
            <span className="fieldError">{errors.title.message}</span>
          )}
        </label>
        <input
          {...register("title", {
            required: "Write a title",
            maxLength: { value: 45, message: "Max length 45 characters" },
          })}
          type="text"
          placeholder="Title.."
          name="title"
          id="title"
        />
        <textarea
          {...register("body", {
            required: "Write something",
            maxLength: { value: 150, message: "Max length 150 characters" },
          })}
          name="body"
          id="body"
          rows="6"
          placeholder="Your message.."
          className="mt-4"
        ></textarea>

        <select
          name="district"
          {...register("district", { required: "Select a district" })}
        >
          <option value="">--Choose a district relevant to your post--</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <button type="submit" disabled={!isValid} className="mt-4">
          Update
        </button>
      </div>
    </form>
  );
}

export default EditPost;
