import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getComments, addComment } from "../redux-stuff/actions";
import NewComment from "./NewComment";
import Comment from "./Comment";

function DetayliTeri() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((store) => store.user);
  const username = user.user.username;
  const userPic = user.user.avatarUrl;
  const comments = useSelector((store) => store.comments);
  const allPosts = useSelector((store) => store.allPosts);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  useEffect(() => {
    if (!allPosts) {
      dispatch(getPosts());
    }
    if (!comments) {
      dispatch(getComments());
    }
  }, []);

  // ResultJSX >>>

  let resultJSX = "";

  if (allPosts === null) {
    resultJSX = "Loading posts";
  } else if (allPosts.length === 0) {
    resultJSX = "No posts available";
  } else {
    resultJSX = allPosts.filter((post) => post.id == id)[0];
  }

  const { district, title, body, date } = resultJSX;

  // Comments JSX >>>
  let commentsJSX = "";
  if (comments === null) {
    commentsJSX = "Loading comments";
  } else if (comments.length === 0) {
    commentsJSX = "No comments available";
  } else {
    commentsJSX = comments.filter((comment) => comment.postId == id);
  }

  // Comment area >>>
  const [commentArea, setCommentArea] = useState(false);

  const handleCommentArea = () => {
    setCommentArea(!commentArea);
  };

  // Votes >>>
  const handleUpvote = () => {
    setUpvote(!upvote);

    setDownvote(false);
  };
  const handleDownvote = () => {
    setDownvote(!downvote);
    setUpvote(false);
  };

  return (
    <div className=" flex  flex-col p-6 border-t bg-[#F8F5F0] w-full	h-fit	rounded-xl">
      {commentArea ? (
        <img
          src="/images/cancel.png"
          alt="comment"
          onClick={handleCommentArea}
          className="w-8"
        />
      ) : (
        <img
          src="/images/comment.png"
          alt="cancel"
          onClick={handleCommentArea}
          className="w-8 mb-8"
        />
      )}

      <div>
        {commentArea && (
          <NewComment
            commentArea={commentArea}
            setCommentArea={setCommentArea}
            id={id}
            title={title}
          />
        )}
      </div>
      <div className="flex">
        <div className="flex flex-col w-5/6">
          <p className="text-xs text-blue-600 mr-auto italic">{district}</p>

          <p className="font-bold text-xl mb-4 mr-4">{title}</p>

          <p className="box-border break-words w-full mb-8">{body}</p>
        </div>
        <p className="text-sm text-blue-600 mr-auto">{date}</p>
      </div>
      <div className="flex mb-8">
        <button className="mr-4">
          <img
            src={upvote ? "/images/up-color.png" : "/images/up-arrow.png"}
            alt="upvote"
            className="w-4"
            onClick={handleUpvote}
          />
        </button>
        <button>
          <img
            src={downvote ? "/images/down-color.png" : "/images/down-arrow.png"}
            alt="downvote"
            className="w-4"
            onClick={handleDownvote}
          />
        </button>
      </div>
      <div className="flex items-center">
        <img
          src={userPic}
          alt="userAvatar"
          className="rounded-full w-8 h-8 mr-2"
        />
        <p className="font-bold text-sm text-blue-600">{username}</p>
      </div>
      <div className="mt-12">
        {Array.isArray(commentsJSX) &&
          commentsJSX.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
}

export default DetayliTeri;
