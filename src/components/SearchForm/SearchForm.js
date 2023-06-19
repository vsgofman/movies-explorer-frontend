import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import iconInput from '../../images/icon__input-search.png';
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/constants';

function SearchForm(props) {
  const {
    setFoMovies,
    isShortMovies,
    setIsShortMovies,
    selectShortMovies,
    searchInputValue,
    setSearchInputValue,
    searchMovies,
    searchSavedMovies,
    setMoviesList,
    isShortSavedMovies,
    savedMoviesPage,
    setSavedMovies,
  } = props;
  function handleChange(evt) {
    setSearchInputValue(evt.target.value);
    // обнуление ошибки инпута
    if (evt.target.value === '' && getLocalStorageItem('foundMovies')) {
      setMoviesList(getLocalStorageItem('allMovies'))
      setLocalStorageItem(false, 'checkbox')
      setIsShortMovies(false)
      setFoMovies([]);
      localStorage.removeItem('foundMovies')
      localStorage.removeItem('inputValue')
      localStorage.removeItem('shortMovies')
    } else if (savedMoviesPage) {
      setSavedMovies(getLocalStorageItem('savedMovies'))
    }
  }

  function handleFilterMovies(evt) {
    evt.preventDefault();
    if (savedMoviesPage) {
      console.log('поиск в форме');
      searchSavedMovies();
    } else {
      searchMovies();
    }
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
            isShortMovies={isShortMovies}
            selectShortMovies={selectShortMovies}
            isShortSavedMovies={isShortSavedMovies}
            savedMoviesPage={savedMoviesPage}
          />
          <p className='search__text'>Короткометражки</p>
        </div>
      </form>
    </section>

  )
}

export default SearchForm;