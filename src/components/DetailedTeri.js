import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  getComments,
  deletePost,
  addVote,
  removeVote,
  getVotes,
  getMyVotes,
} from "../redux-stuff/actions";
import NewComment from "./NewComment";
import Comment from "./Comment";
import EditPost from "./EditPost";
import { format } from "date-fns";

function DetayliTeri() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user, comments, allPosts, myVotes, votes } = useSelector(
    (store) => store
  );

  const history = useHistory();
  const [vote, setVote] = useState(null);
  const [commentArea, setCommentArea] = useState(false);
  const handleCommentArea = () => {
    setCommentArea(!commentArea);
  };

  useEffect(() => {
    if (!allPosts) {
      dispatch(getPosts());
    }
    dispatch(getVotes());
    dispatch(getMyVotes(user, id));
    dispatch(getComments());
  }, [vote, commentArea]);

  // ResultJSX >>>
  let resultJSX = "";
  if (allPosts === null) {
    resultJSX = "Loading posts";
  } else if (allPosts.length === 0) {
    resultJSX = "No posts available";
  } else {
    resultJSX = allPosts.filter((post) => post.post_id == id)[0];
  }
  const {
    district,
    title,
    body,
    post_date,
    username,
    user_id,
    post_id,
    avatarUrl,
  } = resultJSX;

  // Comments JSX >>>

  let commentsJSX = "";

  if (comments === null) {
    commentsJSX = "Loading comments";
  } else if (comments.length === 0) {
    commentsJSX = "No comments available";
  } else {
    commentsJSX = comments.filter((comment) => comment.post_id == id);
  }
  // Comment area >>>

  // Votes >>>
  let currentUserVoteId;
  let currentUserVote;

  if (myVotes == null) {
    currentUserVoteId = "Loading id";
    currentUserVote = "Loading vote";
  } else if (myVotes.length === 0) {
    currentUserVoteId = "This user has no votes for this post";
    currentUserVote = "This user has no votes for this post";
  } else if (myVotes !== null) {
    currentUserVoteId = myVotes["vote_id"] || null;
    currentUserVote = myVotes["vote"] || null;
  } else {
    currentUserVoteId = "";
    currentUserVote = "";
  }

  const handleUpvote = () => {
    if (currentUserVote !== "up") {
      dispatch(
        addVote({
          vote: "up",
          vote_date: format(new Date(), "dd/MM/yyyy"),
          post_id: post_id,
          user_id: user.user_id,
        })
      );
      setVote("up");
      dispatch(getMyVotes(user, id));
      dispatch(getVotes());
    } else if (currentUserVote == "up") {
      dispatch(removeVote(currentUserVoteId));
      dispatch(getMyVotes(user, id));
      dispatch(getVotes());
      setVote(null);
    }
  };
  const handleDownvote = () => {
    if (currentUserVote !== "down") {
      dispatch(
        addVote({
          vote: "down",
          vote_date: format(new Date(), "dd/MM/yyyy"),
          post_id: post_id,
          user_id: user.user_id,
        })
      );
      setVote("down");
      dispatch(getMyVotes(user, id));
      dispatch(getVotes());
    } else if (currentUserVote == "down") {
      dispatch(removeVote(currentUserVoteId));
      dispatch(getMyVotes(user, id));
      dispatch(getVotes());
      setVote(null);
    }
  };

  // Votes >>
  let allVotes = "";
  let upVotes = "";
  let downVotes = "";
  if (votes == null) {
    allVotes = "Loading votes";
  } else if (votes.length == 0) {
    allVotes = "No votes available";
  } else {
    dispatch(getVotes());
    allVotes = votes.filter((v) => v.post_id == id);
    upVotes = allVotes.filter((v) => v.vote == "up");
    downVotes = allVotes.filter((v) => v.vote == "down");
  }
  // Edit Post >>>
  const [editArea, setEditArea] = useState(false);
  const handleEditArea = () => {
    setEditArea(!editArea);
  };

  // Delete Post >>>
  const handleDeletePost = () => {
    dispatch(deletePost(id));
    history.push("/son-postlar");
  };
  return (
    <div className=" flex  flex-col p-6 border-t bg-[#F8F5F0] w-full	h-fit	rounded-xl">
      <div className="flex justify-between">
        {commentArea && (
          <img
            src="/images/cancel.png"
            alt="close-comment"
            onClick={handleCommentArea}
            className="w-6 cursor-pointer"
          />
        )}
        {editArea && (
          <img
            src="/images/cancel.png"
            alt="close-comment"
            onClick={handleEditArea}
            className="w-6 cursor-pointer"
          />
        )}
        {!editArea && !commentArea && (
          <div className="flex w-5/6">
            <img
              src="/images/comment.png"
              alt="comment"
              onClick={handleCommentArea}
              className="w-6 cursor-pointer"
            />
            <p
              className="ml-2 text-sm text-blue-600 cursor-pointer"
              onClick={handleCommentArea}
            >
              Add Comment
            </p>
          </div>
        )}
        {user.user_id == user_id && !commentArea && !editArea && (
          <div className="flex mr-auto">
            <div className="flex ">
              <img
                src="/images/editing.png"
                alt="edit-post"
                className="w-6 cursor-pointer mr-4"
                onClick={handleEditArea}
              />
            </div>
            <div className="flex ">
              <img
                src="/images/delete.png"
                alt="edit-post"
                className="w-6 cursor-pointer "
                onClick={handleDeletePost}
              />
            </div>
          </div>
        )}
      </div>

      {commentArea && (
        <div className="mb-16">
          <NewComment
            commentArea={commentArea}
            setCommentArea={setCommentArea}
            id={id}
            title={title}
          />
        </div>
      )}
      {editArea && (
        <div className="mb-16">
          <EditPost
            editArea={editArea}
            setEditArea={setEditArea}
            handleEditArea={handleEditArea}
            post_id={post_id}
          />
        </div>
      )}
      <div className="flex mt-8">
        <div className="flex flex-col w-5/6">
          <p className="text-xs text-blue-600 mr-auto italic">{district}</p>

          <p className="font-bold text-xl mb-4 mr-4">{title}</p>

          <p className="box-border break-words w-full mb-8">{body}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-blue-600 mr-auto mb-4">{post_date}</p>
          <p className="text-xs ">{`${commentsJSX.length} comment`}</p>
          <p className="text-xs text-green-600">{`${upVotes.length} upvote`}</p>
          <p className="text-xs text-rose-700">{`${downVotes.length} downvote`}</p>
        </div>
      </div>
      <div className="flex mb-8">
        {currentUserVote == "up" || currentUserVote !== "down" ? (
          <button className="mr-4">
            <img
              src={
                currentUserVote === "up"
                  ? "/images/up-color.png"
                  : "/images/up-arrow.png"
              }
              alt="upvote"
              className="w-4"
              onClick={handleUpvote}
            />
          </button>
        ) : null}

        {currentUserVote == "down" || currentUserVote !== "up" ? (
          <button>
            <img
              src={
                currentUserVote == "down"
                  ? "/images/down-color.png"
                  : "/images/down-arrow.png"
              }
              alt="downvote"
              className="w-4"
              onClick={handleDownvote}
            />
          </button>
        ) : null}
      </div>
      <div className="flex items-center">
        <Link to={`/user/${user_id}`}>
          <img
            src={avatarUrl ? avatarUrl : "/images/logo.png"}
            alt="userAvatar"
            className="rounded-full w-8 h-8 mr-2"
          />
          <p className="font-bold text-sm text-blue-600">{username}</p>
        </Link>
      </div>

      <div className="mt-12">
        {Array.isArray(commentsJSX) &&
          commentsJSX.map((comment) => (
            <Comment key={comment.comment_id} comment={comment} />
          ))}
      </div>
    </div>
  );
}

export default DetayliTeri;
