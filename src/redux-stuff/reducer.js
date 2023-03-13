import {
  getUserFromLs,
  LOGIN,
  LOGOUT,
  GET_POSTS,
  GET_MY_POSTS,
  ADD_POST,
  ADD_COMMENT,
  GET_COMMENTS,
  USERS,
  EDIT_POST,
  DELETE_POST,
  ADD_VOTE,
  REMOVE_VOTE,
  GET_VOTES,
} from "./actions";

const initialState = {
  user: getUserFromLs(),
  users: null,
  allPosts: null,
  myPosts: null,
  comments: null,
  votes: null,
  districts: ["Adalar", "Beşiktaş", "Beyoğlu", "Kadıköy", "Kartal", "Maltepe"],
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
    case USERS:
      return {
        ...state,
        users: action.payload,
      };
    case EDIT_POST:
      const copyPosts = [...state.allPosts];
      const oldPost = copyPosts.filter(
        (p) => p.post_id == action.payload.post_id
      )[0];
      const updatedPost = action.payload;
      const index = copyPosts.indexOf(oldPost);
      copyPosts.splice(index, 1, updatedPost);
      return {
        ...state,
        allPosts: [...copyPosts],
      };
    case DELETE_POST:
      const copyPosts2 = [...state.allPosts];
      const resultPosts = copyPosts2.filter(
        (p) => action.payload !== p.post_id
      );
      return {
        ...state,
        allPosts: [...resultPosts],
      };
    case ADD_VOTE:
      return {
        ...state,
        votes: [action.payload, ...(state.votes || [])],
      };
    case REMOVE_VOTE:
      const copyVotes = [...(state.votes || [])];
      const newVotes = copyVotes.filter((v) => action.payload !== v.vote_id);
      return {
        ...state,
        votes: [...newVotes],
      };
    case GET_VOTES:
      return {
        ...state,
        votes: action.payload,
      };
    default:
      return state;
  }
}
