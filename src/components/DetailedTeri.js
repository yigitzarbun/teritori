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
} from "../redux-stuff/actions";
import NewComment from "./NewComment";
import Comment from "./Comment";
import EditPost from "./EditPost";
import { format } from "date-fns";

function DetayliTeri() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((store) => store.user);
  const comments = useSelector((store) => store.comments);
  const allPosts = useSelector((store) => store.allPosts);
  const votes = useSelector((store) => store.votes);
  const history = useHistory();
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  useEffect(() => {
    if (!allPosts) {
      dispatch(getPosts());
    }
    if (!votes) {
      dispatch(getVotes());
    }
    dispatch(getComments());
  }, []);

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

  const [commentArea, setCommentArea] = useState(false);

  const handleCommentArea = () => {
    setCommentArea(!commentArea);
  };

  // Votes >>>
  let currentUserVoteId = "";
  let currentUserVote = "";
  if (votes === null) {
    currentUserVoteId = "Loading id";
  } else if (votes.length === 0) {
    currentUserVoteId = "This user has no votes for this post";
  } else {
    currentUserVoteId = votes.filter(
      (vote) => vote.user_id == user.user_id && vote.post_id == post_id
    )[0];
    if (currentUserVoteId) {
      currentUserVoteId = currentUserVoteId.vote_id;
    }
    currentUserVote = votes.filter(
      (vote) => vote.user_id == user.user_id && vote.post_id == post_id
    )[0];
    if (currentUserVote) {
      currentUserVote = currentUserVote.vote;
    }
  }
  const [vote, setVote] = useState(currentUserVote ? currentUserVote : null);
  const handleUpvote = () => {
    setUpvote(!upvote);
    setDownvote(false);
    if (!upvote) {
      dispatch(
        addVote({
          vote: "up",
          vote_date: format(new Date(), "dd/MM/yyyy"),
          post_id: post_id,
          user_id: user.user_id,
        })
      );
      setVote("up");
    } else {
      dispatch(removeVote(currentUserVoteId));
      setVote(null);
    }
  };
  const handleDownvote = () => {
    setDownvote(!downvote);
    setUpvote(false);
    if (!downvote) {
      dispatch(
        addVote({
          vote: "down",
          vote_date: format(new Date(), "dd/MM/yyyy"),
          post_id: post_id,
          user_id: user.user_id,
        })
      );
      setVote("down");
    } else {
      dispatch(removeVote(currentUserVoteId));
      setVote(null);
    }
  };

  // votesJSX >>>

  let votesJSX = "";

  if (votes === null) {
    votesJSX = "Loading votes";
  } else if (votes.length === 0) {
    votesJSX = "No votes available";
  } else {
    votesJSX = votes.filter((vote) => vote.post_id == id);
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
        <p className="text-sm text-blue-600 mr-auto">{post_date}</p>
      </div>
      <div className="flex mb-8">
        {upvote == true || vote == null ? (
          <button className="mr-4">
            <img
              src={
                vote === "up" ? "/images/up-color.png" : "/images/up-arrow.png"
              }
              alt="upvote"
              className="w-4"
              onClick={handleUpvote}
            />
          </button>
        ) : null}

        {downvote == true || vote == null ? (
          <button>
            <img
              src={
                downvote ? "/images/down-color.png" : "/images/down-arrow.png"
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
