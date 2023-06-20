import './SavedMovies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  const {
    loggedIn,
    location,
    movies,
    savedMovies,
    isShortSavedMovies,
    setIsShortSavedMovies,
    selectShortMovies,
    savedMoviesPage,
    searchSavedMovies,
    setSavedMovies,
    errorSearchMovie,
    setErrorSearchMovie,
    isLoading,


    onSelectShortFilms,
    searchInputValue,
    setSearchInputValue,
    searchMovies,
    handleAddFavorites,
    handleRemoveFavorites,
  } = props;

  return (
    <BlockPage loggedIn={loggedIn} location={location}>
      <section className='saved-movies'>
        <SearchForm
          isShortSavedMovies={isShortSavedMovies}
          setIsShortSavedMovies={setIsShortSavedMovies}
          selectShortMovies={selectShortMovies}
          onSelectShortFilms={onSelectShortFilms}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          searchMovies={searchMovies}
          savedMoviesPage={savedMoviesPage}
          searchSavedMovies={searchSavedMovies}
          setSavedMovies={setSavedMovies}
          errorSearchMovie={errorSearchMovie}
          setErrorSearchMovie={setErrorSearchMovie}
        />
        {isLoading ? <Preloader /> :
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            savedMoviesPage={savedMoviesPage}

            handleAddFavorites={handleAddFavorites}
            handleRemoveFavorites={handleRemoveFavorites}
          />}
      </section>
    </BlockPage >
  )
}

export default SavedMovies;