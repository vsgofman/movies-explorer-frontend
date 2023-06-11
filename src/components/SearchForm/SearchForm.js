import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import iconInput from '../../images/icon__input-search.png';

function SearchForm({ shortMoviesOnly, selectShortMovies, searchInputValue, setSearchInputValue, filterMovies }) {

  function handleChange(evt) {
    setSearchInputValue(evt.target.value);
  }

  function handleFilterMovies(evt) {
    evt.preventDefault();
    filterMovies();
  }

  return (
    <section className='search'>
      <form className='search__form'>
        <img className='search__img' src={iconInput} alt='иконка поиска' />
        <input
          className='search__input'
          id='search-input'
          type='text'
          name='search'
          placeholder='Фильм'
          value={searchInputValue || ""}
          onChange={handleChange}
        />
        <button
          className='search__button'
          aria-label='Поиск'
          onClick={handleFilterMovies}
        />
        <div className='search__filter'>
          <FilterCheckbox
            shortMoviesOnly={shortMoviesOnly}
            selectShortMovies={selectShortMovies}
          />
          <p className='search__text'>Короткометражки</p>
        </div>
      </form>
    </section>

  )
}

export default SearchForm;