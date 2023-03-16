import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../redux-stuff/actions";
import User from "./User";

function Users() {
  const dispatch = useDispatch();
  const { users, user } = useSelector((store) => store);

  useEffect(() => {
    if (!users) {
      dispatch(getUsers());
    }
  }, []);
  let resultJSX = "";
  if (users === null) {
    resultJSX = "Loading users";
  } else if (users.length === 0) {
    resultJSX = "No users available";
  } else {
    resultJSX = users
      .sort((a, b) => b.username - a.username)
      .filter((u) => u.user_id !== user.user_id)
      .map((user) => <User key={user.user_id} user={user} />);
  }
  return <div className="mb-8">{resultJSX}</div>;
}

export default Users;
