import {
  getUserFromLs,
  LOGIN,
  LOGOUT,
  GET_POSTS,
  GET_MY_POSTS,
} from "./actions";

const initialState = {
  user: getUserFromLs(),
  allPosts: null,
  myPosts: null,
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
    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
      };
    default:
      return state;
  }
}
