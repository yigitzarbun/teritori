import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  getComments,
  getPosts,
  getVotes,
} from "../redux-stuff/actions";

function DetailedUser() {
  const comments = useSelector((store) => store.comments);
  const allPosts = useSelector((store) => store.allPosts);
  const users = useSelector((store) => store.users);
  const votes = useSelector((store) => store.votes);

  const dispatch = useDispatch();
  let { id } = useParams();
  id = Number(id);

  useEffect(() => {
    if (!comments) {
      dispatch(getComments());
    }
    if (!allPosts) {
      dispatch(getPosts());
    }
    if (!users) {
      dispatch(getUsers());
    }
    if (!votes) {
      dispatch(getVotes());
    }
  }, []);

  let user;
  let userComments;
  let userPosts;
  let userVotes;

  if (allPosts == null) {
    userPosts = "loading";
  } else {
    userPosts = allPosts.filter((p) => p.user_id == id);
  }

  if (users == null) {
    user = "loading";
  } else {
    user = users.filter((u) => u.user_id == id)[0];
  }

  if (comments == null) {
    userComments = "loading";
  } else {
    userComments = comments.filter((c) => c.user_id == id);
  }

  if (votes == null) {
    userVotes = "loading";
  } else {
    userVotes = votes.filter((v) => v.user_id == id);
  }

  let resultJSX = "";

  if (userPosts === null) {
    resultJSX = "Loading posts";
  } else if (Array.isArray(userPosts) && userPosts.length === 0) {
    resultJSX = "No posts available";
  } else if (Array.isArray(userPosts)) {
    resultJSX = userPosts.map((post) => (
      <div className="flex justify-between" key={post.post_id}>
        <Link
          to={`/post-detay/${post.post_id}`}
          className="shadox-xl mb-4 border-b w-3/4 truncate ..."
        >
          <p key={post.post_id}>{post.title}</p>
        </Link>
        <p className="text-sm text-blue-600">{post.post_date}</p>
      </div>
    ));
  }

  return (
    <div className="p-6 border-t w-full bg-[#F8F5F0] flex justify-start gap-x-6 rounded-xl">
      <img
        src={user.avatarUrl ? user.avatarUrl : "/images/logo.png"}
        className="rounded-full h-48 w-48"
        alt="user-avatar"
      />
      <div className="flex-col w-3/4">
        <p className="font-bold text-2xl">{user.username}</p>
        <p className="text-blue-600 italic text-xs mb-8">{user.district}</p>
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <img
              src={"/images/editing.png"}
              alt="posts"
              className="w-4 h-4 mr-2"
            />
            <p className="text-xs text-blue-600">{`${userPosts.length} post`}</p>
          </div>
          <div className="flex items-center mb-2">
            <img
              src={"/images/comment.png"}
              alt="comments"
              className="w-4 h-4 mr-2"
            />
            <p className="text-xs text-blue-600">{`${userComments.length} comment`}</p>
          </div>
          <div className="flex items-center mb-2">
            <img
              src={"/images/up-arrow.png"}
              alt="vote"
              className="w-4 h-4 mr-2"
            />
            <p className="text-xs text-blue-600">{`${userVotes.length} vote`}</p>
          </div>
        </div>
        <div className="flex-col">{resultJSX}</div>
      </div>
    </div>
  );
}

export default DetailedUser;
