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
      <div key={post.id} className="p-6 border-t bg-white">
        {post.body}
      </div>
    ));
  }
  return <div className="shadox-xl mb-16">{resultJSX}</div>;
}

export default MyPosts;
