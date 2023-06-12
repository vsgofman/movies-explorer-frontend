import './Movies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ selectShortMovies, shortMoviesOnly, movies, loggedIn, searchInputValue, setSearchInputValue, filterMovies, setMoviesList, setShowAllMovies, showAllMovies }) {
  return (
    <BlockPage loggedIn={loggedIn}>
      <section className='movies'>
        <SearchForm
          shortMoviesOnly={shortMoviesOnly}
          selectShortMovies={selectShortMovies}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          filterMovies={filterMovies}
          setMoviesList={setMoviesList}
          setShowAllMovies={setShowAllMovies}
        />
        <MoviesCardList
          movies={movies}
          showAllMovies={showAllMovies}
        />
      </section>
    </BlockPage>
  )
}

export default Movies;