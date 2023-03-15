import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVotes, getMyVotes } from "../redux-stuff/actions";

function Teri(props) {
  const {
    body,
    post_date,
    username,
    avatarUrl,
    title,
    district,
    post_id,
    user_id,
  } = props.post;
  const { votes, myVotes, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVotes());
    dispatch(getMyVotes(user, post_id));
  }, []);

  let allVotes = "";
  let upvotes = "";
  let downvotes = "";

  if (votes == null) {
    allVotes = "Loading votes";
    upvotes = "Loading votes";
    downvotes = "Loading votes";
  } else if (votes.length == 0) {
    allVotes = "No votes available";
    upvotes = "No votes available";
    downvotes = "No votes available";
  } else {
    allVotes = votes.filter((v) => v.post_id == post_id);
    upvotes = allVotes.filter((v) => v.vote == "up");
    downvotes = allVotes.filter((v) => v.vote == "down");
  }

  return (
    <div className=" flex  flex-col p-6 border-t bg-[#F8F5F0] w-full	h-fit	rounded-xl mb-1">
      <div className="flex">
        <div className="flex flex-col w-5/6">
          <p className="text-xs text-blue-600 mr-auto italic">{district}</p>
          <Link to={`/post-detay/${post_id}`}>
            <p className="font-bold text-xl mb-4 mr-4">{title}</p>
          </Link>

          <p className="box-border break-words w-full mb-8">{body}</p>
        </div>
        <p className="text-sm text-blue-600 mr-auto">{post_date}</p>
      </div>
      <div className="flex mb-8">
        <Link to={`/post-detay/${post_id}`} className="mr-4">
          <button>
            <img src="/images/up-arrow.png" alt="upvote" className="w-4" />
          </button>
          <p className="text-xs text-green-600 text-center">{upvotes.length}</p>
        </Link>
        <Link to={`/post-detay/${post_id}`}>
          <button>
            <img src="/images/down-arrow.png" alt="downvote" className="w-4" />
          </button>
          <p className="text-xs text-rose-700 text-center">
            {downvotes.length}
          </p>
        </Link>
      </div>

      <Link to={`/user/${user_id}`}>
        <img
          src={avatarUrl ? avatarUrl : "/images/logo.png"}
          alt="userAvatar"
          className="rounded-full w-8 h-8 mr-2"
        />
        <p className="font-bold text-sm text-blue-600">{username}</p>
      </Link>
    </div>
  );
}

export default Teri;
