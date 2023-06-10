import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ onSelectShortFilms, movies }) {
  return (
    <section className='movies'>
      <SearchForm onSelectShortFilms={onSelectShortFilms} />
      <MoviesCardList movies={movies}/>
    </section>
  )
}

export default Movies;