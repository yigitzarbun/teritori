import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getComments, getPosts } from "../redux-stuff/actions";

function DetailedUser() {
  const comments = useSelector((store) => store.comments);
  const allPosts = useSelector((store) => store.allPosts);
  const users = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const { id } = useParams();
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
  }, []);

  const user = users.filter((u) => u.user_id == id)[0];
  const userPosts = allPosts.filter((p) => p.user_id == id);
  let resultJSX = "";
  if (userPosts === null) {
    resultJSX = "Loading posts";
  } else if (userPosts.length === 0) {
    resultJSX = "No posts available";
  } else {
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
      />
      <div className="flex-col w-3/4">
        <p className="font-bold text-2xl">{user.username}</p>
        <p className="text-blue-600 italic text-xs mb-8">{user.district}</p>
        <div className="flex-col">{resultJSX}</div>
      </div>
    </div>
  );
}

export default DetailedUser;
