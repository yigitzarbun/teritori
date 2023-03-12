import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux-stuff/actions";
import Teri from "./Teri";

function TimeLine(props) {
  const { searchTerm, clearSearch } = props;
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
      .sort((a, b) => b.post_id - a.post_id)
      .map((post) => <Teri key={post.id} post={post} />);
  }
  return (
    <>
      {resultJSX.length > 0 ? (
        <div className="shadow-xl mb-16 rounded-full">{resultJSX}</div>
      ) : (
        <div className=" text-center bg-[#F8F5F0] shadow-lg rounded-xl flex-col max-w-5xl mx-auto">
          <p className="text-xl font-bold pt-8 px-8">
            There are no posts matching your search criteria
          </p>
          <button
            onClick={clearSearch}
            className="bg-black hover:bg-blue-600 mt-8  text-white block p-3 w-1/4 mx-auto disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl	"
          >
            Clear search
          </button>
          <img
            src="images/G2.jpg"
            alt="no results for search criteria"
            className="rounded-full w-2/3 mx-auto"
          />
        </div>
      )}
    </>
  );
}

export default TimeLine;
