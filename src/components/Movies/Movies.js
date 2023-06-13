import './Movies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ selectShortMovies, shortMoviesOnly, movies, loggedIn, searchInputValue, setSearchInputValue, searchMovies, setMoviesList, handleShowAllMovies, showAllMovies, setShortMoviesOnly }) {
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
        />
      </section>
    </BlockPage>
  )
}

export default Movies;