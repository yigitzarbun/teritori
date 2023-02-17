import { toast } from "react-toastify";
import axios from "axios";

export function getUserFromLs() {
  let user = null;
  const userString = localStorage.getItem("teritori");
  if (userString) {
    user = JSON.parse(userString);
  }
  return user;
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_POSTS = "GET_POSTS";
export const GET_MY_POSTS = "GET_MY_POSTS";

export const loginWith = (formData, history) => (dispatch) => {
  axios
    .post("  http://localhost:5000/login", formData)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: LOGIN, payload: response.data });
        toast.success("Login successful");
        setTimeout(() => {
          history.push("/son-postlar");
        }, 2000);
      }
    })
    .catch((error) => {
      toast.error(error.response.data);
      console.log("login hata: ", error);
    });
};

export const getPosts = () => (dispatch) => {
  axios
    .get("http://localhost:5000/posts")
    .then((response) => {
      dispatch({ type: GET_POSTS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getMyPosts = (user) => (dispatch) => {
  axios
    .get("http://localhost:5000/640/posts", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((response) => {
      const myPosts = response.data.filter(
        (post) => post.userId === user.user.id
      );
      dispatch({ type: GET_MY_POSTS, payload: myPosts });
    })
    .catch((error) => {
      console.log(error);
    });
};
