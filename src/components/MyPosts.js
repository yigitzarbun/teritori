import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPosts,
  getVotes,
  getComments,
  deletePost,
} from "../redux-stuff/actions";
import { Link, useHistory } from "react-router-dom";
import EditPost from "./EditPost";

function MyPosts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, myPosts, votes, comments } = useSelector((store) => store);
  const [editArea, setEditArea] = useState(false);

  // edit post >>>
  const handleEditArea = () => {
    dispatch(getMyPosts(user));
    setEditArea(!editArea);
    dispatch(getMyPosts(user));
  };

  // delete Post >>>

  const handleDeletePost = (id) => {
    dispatch(getMyPosts(user));
    dispatch(deletePost(id));
    dispatch(getMyPosts(user));
    history.push("/son-postlar");
  };

  // result JSX (myPosts) >>>
  let resultJSX = "";
  if (myPosts === null) {
    resultJSX = "Loading posts";
  } else if (myPosts.length === 0) {
    resultJSX = (
      <div>
        <p className="font-bold text-xl">No posts available</p>
        <p className="mb-4">Create your first post</p>
        <Link to="/yeni-post">
          <button className="bg-black text-white block p-3 w-1/3 hover:bg-blue-600 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl">
            Create Post
          </button>
        </Link>
      </div>
    );
  } else if (
    Array.isArray(myPosts) &&
    myPosts !== null &&
    myPosts !== undefined
  ) {
    resultJSX = myPosts.map((post) => (
      <div className="flex justify-between items-start" key={post.post_id}>
        {editArea && (
          <div className="mb-16">
            <img
              src="/images/cancel.png"
              alt="close-comment"
              onClick={handleEditArea}
              className="w-6 cursor-pointer"
            />
            <EditPost
              editArea={editArea}
              setEditArea={setEditArea}
              handleEditArea={handleEditArea}
              post_id={post.post_id}
            />
          </div>
        )}
        <Link
          to={`/post-detay/${post.post_id}`}
          className="shadox-xl mb-4 border-b w-3/4 truncate ..."
        >
          <p key={post.post_id}>{post.title}</p>
        </Link>
        <div className="flex mr-auto">
          <div className="flex ">
            <img
              src="/images/editing.png"
              alt="edit-post"
              className="w-6 cursor-pointer mr-4 ml-4"
              onClick={() => handleEditArea(post.post_id)}
            />
          </div>
          <div className="flex ">
            <img
              src="/images/delete.png"
              alt="edit-post"
              className="w-6 cursor-pointer "
              onClick={() => handleDeletePost(post.post_id)}
            />
          </div>
        </div>
        <p className="text-sm text-blue-600 ml-2">{post.post_date}</p>
      </div>
    ));
  }
  // myVotes >>>
  let myVotes = "";
  if (votes == null) {
    myVotes = "Loading votes";
  } else if (votes.length == 0) {
    myVotes = "No available votes";
  } else {
    myVotes = votes.filter((v) => v.user_id == user.user_id);
  }
  // myComments >>>
  let myComments = "";
  if (comments == null) {
    myComments = "Loading comments";
  } else if (comments.length == 0) {
    myComments = "No available comments";
  } else {
    myComments = comments.filter((c) => c.user_id == user.user_id);
  }

  useEffect(() => {
    dispatch(getMyPosts(user));
    dispatch(getVotes());
    dispatch(getComments());
  }, []);

  return (
    <div className="p-6 border-t w-full bg-[#F8F5F0] flex justify-start gap-x-6 rounded-xl">
      <img
        src={user.avatarUrl ? user.avatarUrl : "/images/logo.png"}
        className="rounded-full h-48 w-48"
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
            <p className="text-xs text-blue-600">{`${resultJSX.length} post`}</p>
          </div>
          <div className="flex items-center mb-2">
            <img
              src={"/images/comment.png"}
              alt="comments"
              className="w-4 h-4 mr-2"
            />
            <p className="text-xs text-blue-600">{`${myComments.length} comment`}</p>
          </div>
          <div className="flex items-center mb-2">
            <img
              src={"/images/up-arrow.png"}
              alt="vote"
              className="w-4 h-4 mr-2"
            />
            <p className="text-xs text-blue-600">{`${myVotes.length} vote`}</p>
          </div>
        </div>
        <div className="flex-col">{resultJSX}</div>
      </div>
    </div>
  );
}

export default MyPosts;
