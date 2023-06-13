import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox({ shortMoviesOnly, selectShortMovies }) {
  function handlerFun() {
    selectShortMovies()
  }
  
  return (
    <div className={`toggle ${shortMoviesOnly ? 'toggle_active' : ''}`} onClick={handlerFun} />
  );
}

export default FilterCheckbox;