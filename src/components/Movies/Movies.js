import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ onSelectShortFilms }) {
  return (
    <section className='movies'>
      <SearchForm onSelectShortFilms={onSelectShortFilms} />
      <MoviesCardList />
    </section>
  )
}

export default Movies;