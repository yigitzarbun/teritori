import React from "react";
import { Link } from "react-router-dom";

function Teri(props) {
  const { body, date, username, userPic, title, district, id } = props.post;
  return (
    <div className=" flex  flex-col p-6 border-t bg-[#F8F5F0] w-full	h-fit	rounded-xl">
      <div className="flex">
        <div className="flex flex-col w-5/6">
          <p className="text-xs text-blue-600 mr-auto italic">{district}</p>
          <Link to={`/post-detay/${id}`}>
            {" "}
            <p className="font-bold text-xl mb-4 mr-4">{title}</p>
          </Link>

          <p className="box-border break-words w-full mb-8">{body}</p>
        </div>
        <p className="text-sm text-blue-600 mr-auto">{date}</p>
      </div>
      <div className="flex mb-8">
        <button className="mr-4">
          <img src="/images/up-arrow.png" alt="upvote" className="w-4" />
        </button>
        <button>
          <img src="/images/down-arrow.png" alt="downvote" className="w-4" />
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
    </div>
  );
}

export default Teri;
