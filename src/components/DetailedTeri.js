import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getComments } from "../redux-stuff/actions";
import { useForm } from "react-hook-form";
import { addComment } from "./../redux-stuff/actions";

function DetayliTeri() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user.user.id;
  const username = user.user.username;
  const userPic = user.user.avatarUrl;
  const comments = useSelector((store) => store.comments);
  const allPosts = useSelector((store) => store.allPosts);

  useEffect(() => {
    if (!allPosts) {
      dispatch(getPosts());
    }
    if (!comments) {
      dispatch(getComments());
    }
  }, []);

  let resultJSX = "";

  if (allPosts === null) {
    resultJSX = "Loading posts";
  } else if (allPosts.length === 0) {
    resultJSX = "No posts available";
  } else {
    resultJSX = allPosts.filter((post) => post.id == id)[0];
  }

  let commentsJSX = "";
  if (comments === null) {
    commentsJSX = "Loading comments";
  } else if (comments.length === 0) {
    commentsJSX = "No comments available";
  } else {
    commentsJSX = comments.filter((comment) => comment.postId == id);
  }
  console.log(commentsJSX);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  function handleAddComment(data) {
    const dataWide = {
      ...data,
      userId: userId,
      username: username,
      userPic: userPic,
      postId: id,
    };
    dispatch(addComment(dataWide));
    reset();
  }
  const { district, title, body, date } = resultJSX;
  return (
    <div className=" flex  flex-col p-6 border-t bg-[#F8F5F0] w-full	h-fit	rounded-xl">
      <p>Say Something</p>
      <div>
        <form onSubmit={handleSubmit(handleAddComment)}>
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
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="flex">
        <div className="flex flex-col w-5/6">
          <p className="text-xs text-blue-600 mr-auto italic">{district}</p>

          <p className="font-bold text-xl mb-4 mr-4">{title}</p>

          <p className="box-border break-words w-full mb-8">{body}</p>
        </div>
        <p className="text-sm text-blue-600 mr-auto">{date}</p>
      </div>
      <div className="flex mb-8">
        <button className="mr-4">
          <img src="/images/up-arrow.png" alt="upvote" className="w-4" />
        </button>
        <button>
          <img src="/images/down-arrow.png" alt="downvote" className="w-4" />
        </button>
      </div>
      <div className="flex items-center">
        <img
          src={userPic}
          alt="userAvatar"
          className="rounded-full w-8 h-8 mr-2"
        />
        <p className="font-bold text-sm text-blue-600">{username}</p>
      </div>
      <div>
        {Array.isArray(commentsJSX) &&
          commentsJSX.map((comment) => <p>{comment.body}</p>)}
      </div>
    </div>
  );
}

export default DetayliTeri;
