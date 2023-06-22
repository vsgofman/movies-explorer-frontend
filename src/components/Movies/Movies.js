import '../App/App.css';
import './Movies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const {
    loggedIn,
    location,
    movies,
    savedMovies,
    showAllMovies,
    isShortMovies,
    setIsShortMovies,
    searchMovies,
    errorSearchMovie,
    setErrorSearchMovie,
    setIsShortSavedMovies,
    isLoading,
    handleNavClick,
    setMoviesList,
    selectShortMovies,
    handleShowAllMovies,
    searchInputValue,
    setSearchInputValue,
    handleAddFavorites,
    handleRemoveFavorites,
  } = props;

  return (
    <BlockPage loggedIn={loggedIn} location={location} handleNavClick={handleNavClick}>
      <section className='movies'>
        <div className='wrapper'>
          <SearchForm
            isShortMovies={isShortMovies}
            setIsShortMovies={setIsShortMovies}
            searchMovies={searchMovies}
            errorSearchMovie={errorSearchMovie}
            setErrorSearchMovie={setErrorSearchMovie}
            setIsShortSavedMovies={setIsShortSavedMovies}
            selectShortMovies={selectShortMovies}
            searchInputValue={searchInputValue}
            setSearchInputValue={setSearchInputValue}
            setMoviesList={setMoviesList}
            showAllMovies={showAllMovies}
          />
          {isLoading ? <Preloader /> :
            <MoviesCardList
              movies={movies}
              savedMovies={savedMovies}
              showAllMovies={showAllMovies}
              handleShowAllMovies={handleShowAllMovies}
              handleAddFavorites={handleAddFavorites}
              handleRemoveFavorites={handleRemoveFavorites}
            />}
        </div>
      </section>
    </BlockPage>
  )
}

export default Movies;