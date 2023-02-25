import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../redux-stuff/actions";

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
      <p key={post.id} className="shadox-xl mb-4 border-b w-64 truncate ...">
        {post.body}
      </p>
    ));
  }
  return (
    <div className="p-6 border-t bg-white flex justify-start gap-x-6 rounded-xl">
      <img src={user.user.avatarUrl} className="rounded-full h-48 w-48" />
      <div className="flex-col">
        <p className="font-bold text-2xl p-6 bg-white">{user.user.username}</p>
        <div>{resultJSX}</div>
      </div>
    </div>
  );
}

export default MyPosts;
