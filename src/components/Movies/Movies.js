import './Movies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ onSelectShortFilms, movies, loggedIn }) {
  return (
    <BlockPage loggedIn={loggedIn}>
      <section className='movies'>
        <SearchForm onSelectShortFilms={onSelectShortFilms} />
        <MoviesCardList movies={movies} />
      </section>
    </BlockPage>
  )
}

export default Movies;