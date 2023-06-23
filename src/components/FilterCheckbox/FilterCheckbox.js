import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox({ isShortMovies, isShortSavedMovies, selectShortMovies, savedMoviesPage }) {
  function handleShortMoviesSelect() {
    selectShortMovies()
  }

  let checkbox = savedMoviesPage ? isShortSavedMovies : isShortMovies;
  
  return (
    <div className={`toggle ${checkbox ? 'toggle_active' : ''}`} onClick={handleShortMoviesSelect} />
  );
}

export default FilterCheckbox;