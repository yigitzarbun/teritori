import React from "react";
import { Link } from "react-router-dom";
function User(props) {
  const { user } = props;
  const userId = user.user_id;
  return (
    <div className=" flex  flex-col p-6 border-t bg-[#F8F5F0] w-full	h-fit	rounded-xl">
      <div className="flex justify-between">
        <p className="text-xs text-blue-600 italic">{user.district}</p>
        <p className="text-sm text-blue-600">{user.signup_date}</p>
      </div>
      <Link to={`/user/${userId}`}>
        <p> {user.username} </p>
      </Link>
      <img
        src={user.avatarUrl}
        alt="user picture"
        className="rounded-full w-8 h-8 mr-2"
      />
    </div>
  );
}

export default User;
