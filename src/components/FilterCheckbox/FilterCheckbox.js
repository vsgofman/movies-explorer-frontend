import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox({ shortMoviesOnly, selectShortMovies }) {
  
  return (
    <div className={`toggle ${shortMoviesOnly ? 'toggle_active' : ''}`} onClick={selectShortMovies} />
  );
}

export default FilterCheckbox;