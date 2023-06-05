import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../utils/constants';

function MoviesCardList() {
  return (
    <section className='movies-list'>
      <div className='movies-list__block'>
        {
          movies.map((movie, i) => (
            <MoviesCard movie={movie} key={movie._id} />
          ))
        }
      </div>
      <button
        className='movies-list__button'
        id="button-more"
        type="button"
        name="more"
      >
        Eщё
      </button>
    </section>
  )
}

export default MoviesCardList;