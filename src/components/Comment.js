import React from "react";

function Comment(props) {
  const comment = props.comment;
  return (
    <div className="my-8 p-6 border rounded-xl ">
      <div className="flex justify-between">
        <p className="text-xs text-blue-600 mr-auto italic">
          {comment.district}
        </p>
        <p className="text-sm text-blue-600 ">{comment.comment_date}</p>
      </div>
      <p className="box-border break-words w-full mb-8">{comment.body}</p>

      <div className="flex items-center">
        <img
          src={
            comment.avatarUrl
              ? comment.avatarUrl
              : "https://fastly.picsum.photos/id/44/200/300.jpg?hmac=XVdwVrJGHwXEzGWC6cZoztYj9nazQEbeWv9VrPmoqps"
          }
          alt="userAvatar"
          className="rounded-full w-8 h-8 mr-2"
        />
        <p className="font-bold text-sm text-blue-600">{comment.username}</p>
      </div>
    </div>
  );
}

export default Comment;
