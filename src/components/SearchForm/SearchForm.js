import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import iconInput from '../../images/icon__input-search.png';
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/constants';

function SearchForm({ shortMoviesOnly, setShortMoviesOnly, selectShortMovies, searchInputValue, setSearchInputValue, searchMovies, setMoviesList }) {

  function handleChange(evt) {
    setSearchInputValue(evt.target.value);
    // обнуление ошибки инпута
    if (evt.target.value === '' && getLocalStorageItem('foundMovies')) {
      setMoviesList(getLocalStorageItem('allMovies'))
      setLocalStorageItem(false, 'checkbox')
      setShortMoviesOnly(false)
      localStorage.removeItem('foundMovies')
      localStorage.removeItem('inputValue')
      localStorage.removeItem('shortMovies')
    }
  }

  function handleFilterMovies(evt) {
    evt.preventDefault();
    searchMovies();
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