import './Movies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  const {
    loggedIn,
    location,
    movies,
    savedMovies,
    
    searchMovies,
    setMoviesList,
    shortMoviesOnly,
    selectShortMovies,
    showAllMovies,
    handleShowAllMovies,
    setShortMoviesOnly,
    searchInputValue,
    setSearchInputValue,
    handleAddFavorites,
    handleRemoveFavorites,
  } = props;

  return (
    <BlockPage loggedIn={loggedIn} location={location}>
      <section className='movies'>
        <SearchForm
          shortMoviesOnly={shortMoviesOnly}
          setShortMoviesOnly={setShortMoviesOnly}
          selectShortMovies={selectShortMovies}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          searchMovies={searchMovies}
          setMoviesList={setMoviesList}
          showAllMovies={showAllMovies}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          showAllMovies={showAllMovies}
          handleShowAllMovies={handleShowAllMovies}
          handleAddFavorites={handleAddFavorites}
          handleRemoveFavorites={handleRemoveFavorites}
        />
      </section>
    </BlockPage>
  )
}

export default Movies;