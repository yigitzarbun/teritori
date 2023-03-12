import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux-stuff/actions";
import Teri from "./Teri";

function TimeLine(props) {
  const { searchTerm } = props;
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
    resultJSX = allPosts
      .filter((p) => {
        if ((p.title && p.title === "") || (p.body && p.body == "")) {
          return p;
        } else if (
          (p.title &&
            p.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.body && p.body.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.username &&
            p.username.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return p;
        }
      })
      .map((post) => <Teri key={post.id} post={post} />);
  }
  return <div className="shadow-xl mb-16 rounded-full">{resultJSX}</div>;
}

export default TimeLine;
