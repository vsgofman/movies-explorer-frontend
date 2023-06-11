import './Movies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ selectShortMovies, shortMoviesOnly, movies, loggedIn, searchInputValue, setSearchInputValue, filterMovies }) {
  return (
    <BlockPage loggedIn={loggedIn}>
      <section className='movies'>
        <SearchForm
          shortMoviesOnly={shortMoviesOnly}
          selectShortMovies={selectShortMovies}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          filterMovies={filterMovies}
        />
        <MoviesCardList movies={movies} />
      </section>
    </BlockPage>
  )
}

export default Movies;