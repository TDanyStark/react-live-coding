import React from "react";
import useForm from "./hook";
import { useLocation } from "wouter";

const RATINGS = ["g", "pg", "pg-13", "r"];

function SearchForm({initialKeyword = "", initialRating = RATINGS[0]}) {
  const [, pushLocation] = useLocation();
  const { keyword, times, rating, updateKeyword, updateRating } = useForm({initialKeyword, initialRating});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // navegar a otra ruta
    pushLocation(`/search/${keyword}/${rating}`);
  };

  const handleChange = (evt) => {
    updateKeyword( evt.target.value);
    //dispatch({ type: ACTIONS.SET_KEYWORD, payload: evt.target.value });
  };


  const handleChangeRating = (evt) => {
    updateRating(evt.target.value);
    //dispatch({ type: ACTIONS.SET_RATING, payload: evt.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button>Buscar</button>
      <input
        placeholder="Search a gif here..."
        onChange={handleChange}
        type="text"
        value={keyword}
      />
      <select value={rating} onChange={handleChangeRating}>
        <option disabled>Rating type</option>
        {RATINGS.map((rating) => (
          <option key={rating}>{rating}</option>
        ))}
      </select>
      <small>{times}</small>
    </form>
  );
}

export default React.memo(SearchForm);
