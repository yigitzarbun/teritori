import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../redux-stuff/actions";
import User from "./User";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
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
      .map((user) => <User key={user.user_id} user={user} />);
  }
  return <div className="mb-8">{resultJSX}</div>;
}

export default Users;
