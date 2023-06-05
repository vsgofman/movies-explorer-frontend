import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ onSelectShortFilms }) {
  return (
    <section className='saved-movies'>
      <SearchForm onSelectShortFilms={onSelectShortFilms} />
      <MoviesCardList />
    </section>
  )
}

export default SavedMovies;