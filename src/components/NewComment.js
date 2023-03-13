import React from "react";
import { addComment } from "../redux-stuff/actions";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";

function NewComment(props) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const districts = useSelector((store) => store.districts);
  const userId = user.user_id;
  const userPic = user.avatarUrl;
  const { commentArea, setCommentArea, id, title } = props;
  const postId = Number(id);
  function handleAddComment(data) {
    const dataWide = {
      ...data,
      user_id: userId,
      post_id: postId,
      comment_date: format(new Date(), "dd/MM/yyyy"),
    };
    dispatch(addComment(dataWide));
    reset();
    setCommentArea(!commentArea);
  }
  // Comment form requirements
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  return (
    <form
      onSubmit={handleSubmit(handleAddComment)}
      className="newCommentForm max-w-md mx-auto bg-white shadow p-8 rounded-xl"
    >
      <img
        src={userPic ? userPic : "/images/logo.png"}
        alt="userAvatar"
        className="rounded-full w-8 h-8 mr-2"
      />
      <h2>Leave your comment regarding: </h2>
      <span className="font-bold text-xl text-blue-600">{title}</span>

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
        Send
      </button>
    </form>
  );
}

export default NewComment;
