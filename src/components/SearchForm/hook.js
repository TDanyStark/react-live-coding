import { useReducer } from "react";

const ACTIONS = {
  SET_KEYWORD: "SET_KEYWORD",
  SET_RATING: "SET_RATING",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.SET_KEYWORD:
      return {
        ...state,
        keyword: payload,
        times: state.times + 1,
      };
    case ACTIONS.SET_RATING:
      return {
        ...state,
        rating: payload,
      };

    default:
      return state;
  }
};

export default function useForm(
  {
    initialKeyword,
    initialRating
  } = {initialKeyword: "", initialRating: "g"}
  ) {
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    times: 0,
    rating: initialRating,
  });

  const { keyword, times, rating } = state;

  return {
    keyword,
    times,
    rating,
    updateKeyword: (keyword) =>
      dispatch({ type: ACTIONS.SET_KEYWORD, payload: keyword }),
    updateRating: (rating) =>
      dispatch({ type: ACTIONS.SET_RATING, payload: rating }),
  };
}
