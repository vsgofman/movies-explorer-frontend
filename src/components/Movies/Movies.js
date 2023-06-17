import './Movies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  const {
    movies,
    searchMovies,
    setMoviesList,
    shortMoviesOnly,
    selectShortMovies,
    showAllMovies,
    handleShowAllMovies,
    setShortMoviesOnly,
    loggedIn,
    searchInputValue,
    setSearchInputValue,
    handleAddFavorites,
    handleRemoveFavorites,
  } = props;

  return (
    <BlockPage loggedIn={loggedIn}>
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