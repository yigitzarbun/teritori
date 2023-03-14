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
export const USERS = "USERS";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_VOTE = "ADD_VOTE";
export const REMOVE_VOTE = "REMOVE_VOTE";
export const GET_VOTES = "GET_VOTES";
export const GET_MY_VOTES = "GET_MY_VOTES";

export const loginWith = (formData, history) => (dispatch) => {
  axios
    .post("http://localhost:9000/api/auth/login", formData)
    .then((response) => {
      if (response.status == 200) {
        dispatch({ type: LOGIN, payload: response.data });
        toast.success("Login successful");
        setTimeout(() => {
          history.push("/son-postlar");
        }, 2000);
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("login hata: ", error);
    });
};

export const getPosts = () => (dispatch) => {
  axios
    .get("http://localhost:9000/api/posts")
    .then((response) => {
      dispatch({ type: GET_POSTS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getComments = () => (dispatch) => {
  axios.get("http://localhost:9000/api/comments").then((response) => {
    dispatch({ type: GET_COMMENTS, payload: response.data });
  });
};
export const getMyPosts = (user) => (dispatch) => {
  axios
    .get("http://localhost:9000/api/posts", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((response) => {
      const myPosts = response.data.filter(
        (post) => post.user_id === user.user_id
      );
      dispatch({ type: GET_MY_POSTS, payload: myPosts });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getMyVotes = (user, id) => (dispatch) => {
  axios.get("http://localhost:9000/api/votes").then((response) => {
    const myVotes = response.data.filter(
      (vote) => vote.user_id === user.user_id && vote.post_id == id
    )[0];
    dispatch({ type: GET_MY_VOTES, payload: myVotes });
  });
};

export const addPost = (data, history) => (dispatch) => {
  axios
    .post("http://localhost:9000/api/posts", data)
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
  axios.post("http://localhost:9000/api/comments", data).then((response) => {
    if (response.status == 201) {
      toast.success("Comment successful!");
      dispatch({ type: ADD_COMMENT, payload: response.data });
    }
  });
};

export const getUsers = () => (dispatch) => {
  axios.get("http://localhost:9000/api/users").then((response) => {
    if (response.status == 200) {
      dispatch({ type: USERS, payload: response.data });
    }
  });
};

export const editPost = (data) => (dispatch) => {
  axios
    .put(`http://localhost:9000/api/posts/${data.post_id}`, data)
    .then((response) => {
      if (response.status == 201) {
        toast.success("Post edit successful!");
        dispatch({ type: EDIT_POST, payload: response.data });
      }
    });
};

export const deletePost = (id) => (dispatch) => {
  axios.delete(`http://localhost:9000/api/posts/${id}`).then((response) => {
    if (response.status == 201) {
      toast.success("Post deleted!");
      dispatch({ type: DELETE_POST, payload: response.data });
    }
  });
};

export const addVote = (data) => (dispatch) => {
  axios.post("http://localhost:9000/api/votes", data).then((response) => {
    if (response.status == 201) {
      dispatch({ type: ADD_VOTE, payload: response.data });
    }
  });
};

export const removeVote = (id) => (dispatch) => {
  axios.delete(`http://localhost:9000/api/votes/${id}`).then((response) => {
    if (response.status == 201) {
      dispatch({ type: REMOVE_VOTE, payload: response.data });
    }
  });
};

export const getVotes = () => (dispatch) => {
  axios.get("http://localhost:9000/api/votes").then((response) => {
    if (response.status == 200) {
      dispatch({ type: GET_VOTES, payload: response.data });
    }
  });
};
