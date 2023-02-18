import {
  getUserFromLs,
  LOGIN,
  LOGOUT,
  GET_POSTS,
  GET_MY_POSTS,
  ADD_POST,
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
    case ADD_POST:
      return {
        ...state,
        myPosts: [action.payload, ...(state.myPosts || [])],
        allPosts: [action.payload, ...(state.allPosts || [])],
      };
    default:
      return state;
  }
}
