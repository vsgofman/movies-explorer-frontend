import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../utils/constants';

function MoviesCardList({ movies }) {
  return (
    <section className='movies-list'>
      {
        movies.map((movie, i) => (
          <MoviesCard movie={movie} key={movie._id} />
        ))
      }
    </section>
  )
}

export default MoviesCardList;