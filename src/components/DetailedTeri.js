import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  getComments,
  addVote,
  addComment,
  getVotes,
} from "../redux-stuff/actions";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

function DetayliTeri() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user.user.id;
  const username = user.user.username;
  const userPic = user.user.avatarUrl;
  const comments = useSelector((store) => store.comments);
  const allPosts = useSelector((store) => store.allPosts);
  const votes = useSelector((store) => store.votes);
  useEffect(() => {
    if (!allPosts) {
      dispatch(getPosts());
    }
    if (!comments) {
      dispatch(getComments());
    }
    if (!votes) {
      dispatch(getVotes());
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
      date: format(new Date(), "dd/MM/yyyy"),
    };
    dispatch(addComment(dataWide));
    reset();
    setCommentArea(!commentArea);
  }

  function handleAddVote(vote) {
    const dataWide = {
      vote: vote,
      userId: userId,
      username: username,
      userPic: userPic,
      postId: id,
      date: format(new Date(), "dd/MM/yyyy"),
    };
    dispatch(addVote(dataWide));
  }

  const [commentArea, setCommentArea] = useState(false);
  const handleCommentArea = () => {
    setCommentArea(!commentArea);
  };
  const { district, title, body, date } = resultJSX;

  let districts = [
    "Adalar",
    "Beşiktaş",
    "Beyoğlu",
    "Kadıköy",
    "Kartal",
    "Maltepe",
  ];

  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  const handleUpvote = () => {
    setUpvote(!upvote);
    if (!upvote) {
      handleAddVote("up");
    }
    setDownvote(false);
  };
  const handleDownvote = () => {
    setDownvote(!downvote);
    if (!downvote) {
      handleAddVote("down");
    }
    setUpvote(false);
  };

  return (
    <div className=" flex  flex-col p-6 border-t bg-[#F8F5F0] w-full	h-fit	rounded-xl">
      <p>{votes.length}</p>
      {commentArea ? (
        <img
          src="/images/cancel.png"
          alt="comment"
          onClick={handleCommentArea}
          className="w-8"
        />
      ) : (
        <img
          src="/images/comment.png"
          alt="cancel"
          onClick={handleCommentArea}
          className="w-8 mb-8"
        />
      )}

      <div>
        {commentArea && (
          <form
            onSubmit={handleSubmit(handleAddComment)}
            className="newCommentForm max-w-md mx-auto bg-white shadow p-8 rounded-xl"
          >
            <img
              src={userPic}
              alt="userAvatar"
              className="rounded-full w-8 h-8 mr-2"
            />
            <h2>Leave your comment regarding: </h2>
            <span className="font-bold text-xl">{title}</span>

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
              <option value="">
                --Choose a district relevant to your post--
              </option>
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
        )}
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
          <img
            src={upvote ? "/images/up-color.png" : "/images/up-arrow.png"}
            alt="upvote"
            className="w-4"
            onClick={handleUpvote}
          />
        </button>
        <button>
          <img
            src={downvote ? "/images/down-color.png" : "/images/down-arrow.png"}
            alt="downvote"
            className="w-4"
            onClick={handleDownvote}
          />
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
      <div className="mt-12">
        {Array.isArray(commentsJSX) &&
          commentsJSX.map((comment) => (
            <div className="my-8 p-6 border rounded-xl ">
              <div className="flex justify-between">
                <p className="text-xs text-blue-600 mr-auto italic">
                  {comment.district}
                </p>
                <p className="text-sm text-blue-600 ">{comment.date}</p>
              </div>
              <p className="box-border break-words w-full mb-8">
                {comment.body}
              </p>

              <div className="flex items-center">
                <img
                  src={comment.userPic}
                  alt="userAvatar"
                  className="rounded-full w-8 h-8 mr-2"
                />
                <p className="font-bold text-sm text-blue-600">
                  {comment.username}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DetayliTeri;
