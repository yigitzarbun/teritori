import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../redux-stuff/actions";
import { Link } from "react-router-dom";

function MyPosts() {
  const dispatch = useDispatch();
  const { user, myPosts } = useSelector((store) => store);
  useEffect(() => {
    if (!myPosts) {
      dispatch(getMyPosts(user));
    }
  }, []);
  let resultJSX = "";
  if (myPosts === null) {
    resultJSX = "Loading posts";
  } else if (myPosts.length === 0) {
    resultJSX = "No posts available";
  } else {
    resultJSX = myPosts.map((post) => (
      <div className="flex justify-between">
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
      <img src={user.avatarUrl} className="rounded-full h-48 w-48" />
      <div className="flex-col w-3/4">
        <p className="font-bold text-2xl">{user.username}</p>
        <p className="text-blue-600 italic text-xs mb-8">{user.district}</p>
        <div className="flex-col">{resultJSX}</div>
      </div>
    </div>
  );
}

export default MyPosts;
