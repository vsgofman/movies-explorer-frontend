import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import iconInput from '../../images/icon__input-search.png';
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/constants';

function SearchForm(props) {
  const {
    isShortMovies,
    setIsShortMovies,
    selectShortMovies,
    searchInputValue,
    setSearchInputValue,
    searchMovies,
    errorSearchMovie,
    setErrorSearchMovie,
    searchSavedMovies,
    setMoviesList,
    isShortSavedMovies,
    setIsShortSavedMovies,
    savedMoviesPage,
    setSavedMovies,
  } = props;

  function handleChange(evt) {
    setSearchInputValue(evt.target.value);
    setErrorSearchMovie("");
    if (evt.target.value === '' && savedMoviesPage) {
      setIsShortSavedMovies(false)
      setSavedMovies(getLocalStorageItem('savedMovies'))
    }
    if (evt.target.value === '' && getLocalStorageItem('foundMovies')) {
      setMoviesList(getLocalStorageItem('allMovies'))
      setLocalStorageItem(false, 'checkbox')
      setIsShortMovies(false);
      setIsShortSavedMovies(false);
      localStorage.removeItem('foundMovies')
      localStorage.removeItem('inputValue')
      localStorage.removeItem('shortMovies')
    }
  }



  function handleFilterMovies(evt) {
    evt.preventDefault();
    if (!evt.target.closest('.search__form').checkValidity()) {
      setErrorSearchMovie('Нужно ввести ключевое слово');
      return;
    }
    if (savedMoviesPage) {
      searchSavedMovies();
    } else {
      searchMovies();
    }
  }

  return (
    <section className='search'>
      <form className='search__form' noValidate>
        <div className='search__block search__block_input'>
          <img className='search__img' src={iconInput} alt='иконка поиска' />
          <input
            className='search__input'
            id='search-input'
            type='text'
            name='search'
            placeholder='Фильм'
            value={searchInputValue || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className='search__block'>
          <button
            className='search__button'
            aria-label='Поиск'
            onClick={handleFilterMovies}
          />
          <div className='search__filter'>
            <FilterCheckbox
              isShortMovies={isShortMovies}
              selectShortMovies={selectShortMovies}
              isShortSavedMovies={isShortSavedMovies}
              savedMoviesPage={savedMoviesPage}
            />
            <p className='search__text'>Короткометражки</p>
          </div>
        </div>
      </form>
      <span className='search__input_error'>{errorSearchMovie}</span>
    </section>

  )
}

export default SearchForm;