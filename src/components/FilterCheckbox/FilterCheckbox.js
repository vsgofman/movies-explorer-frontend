import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox() {
  const [shortFilmsOnly, setShortFilmsOnly] = useState(false);
  function selectShortFilms() { setShortFilmsOnly(!shortFilmsOnly); }
  
  return (
    <div className={`toggle ${shortFilmsOnly ? 'toggle_active' : ''}`} onClick={selectShortFilms} />
  );
}

export default FilterCheckbox;