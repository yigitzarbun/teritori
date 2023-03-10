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
export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";

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
export const getComments = () => (dispatch) => {
  axios.get("http://localhost:5000/comments").then((response) => {
    dispatch({ type: GET_COMMENTS, payload: response.data });
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
export const addPost = (data, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/posts", data)
    .then((response) => {
      if (response.status === 201) {
        toast.success("Post successful!");
        dispatch({ type: ADD_POST, payload: response.data });
        setTimeout(() => {
          history.push("/son-postlar");
        }, 2000);
      }
    })
    .catch((error) => console.log(error));
};
export const addComment = (data) => (dispatch) => {
  axios.post("http://localhost:5000/comments", data).then((response) => {
    if (response.status == 201) {
      toast.success("Comment successful!");
      dispatch({ type: ADD_COMMENT, payload: response.data });
    }
  });
};
