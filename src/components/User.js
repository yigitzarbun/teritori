import React from "react";

function User(props) {
  const { user } = props;
  return <div>{user.username}</div>;
}

export default User;
