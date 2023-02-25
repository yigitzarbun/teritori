import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux-stuff/actions";
import Teri from "./Teri";

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
    resultJSX = allPosts.map((post) => <Teri key={post.id} post={post} />);
  }
  return <div className="shadow-xl mb-16 rounded-full">{resultJSX}</div>;
}

export default TimeLine;
