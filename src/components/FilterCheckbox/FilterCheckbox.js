import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox({ shortMoviesOnly, selectShortMovies }) {
  function handleShortMoviesSelect() {
    selectShortMovies()
  }
  
  return (
    <div className={`toggle ${shortMoviesOnly ? 'toggle_active' : ''}`} onClick={handleShortMoviesSelect} />
  );
}

export default FilterCheckbox;