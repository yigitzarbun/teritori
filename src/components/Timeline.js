import { all } from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux-stuff/actions";

function TimeLine() {
  const allPosts = useSelector((store) => store.allPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!allPosts) {
      dispatch(getPosts());
    }
  }, [allPosts]);

  let resultJSX = "";

  if (allPosts === null) {
    resultJSX = "Loading posts";
  } else if (allPosts.length === 0) {
    resultJSX = "No posts available";
  } else {
    resultJSX = allPosts.map((post) => (
      <div key={post.id} className="p-6 border-t bg-white">
        {post.body}
      </div>
    ));
  }
  return <div className="shadow-xl mb-16">{resultJSX}</div>;
}

export default TimeLine;
