import {
  getUserFromLs,
  LOGIN,
  LOGOUT,
  GET_POSTS,
  GET_MY_POSTS,
  ADD_POST,
  ADD_COMMENT,
  GET_COMMENTS,
  ADD_VOTE,
  GET_VOTES,
} from "./actions";

const initialState = {
  user: getUserFromLs(),
  allPosts: null,
  myPosts: null,
  comments: null,
  votes: null,
};

export function myReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("teritori", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("teritori");
      return {
        ...state,
        user: null,
      };
    case GET_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_VOTES:
      return {
        ...state,
        votes: action.payload,
      };
    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        myPosts: [action.payload, ...(state.myPosts || [])],
        allPosts: [action.payload, ...(state.allPosts || [])],
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...(state.comments || [])],
      };
    case ADD_VOTE:
      return {
        ...state,
        votes: [action.payload, ...[state.votes || []]],
      };

    default:
      return state;
  }
}
