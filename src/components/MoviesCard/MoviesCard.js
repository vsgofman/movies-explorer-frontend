import './MoviesCard.css';
import { useState } from 'react';
import cardImage from '../../images/Baskiya_vzryv_realnosti.svg';

function MoviesCard(props) {
  const movie = props.movie;
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const [isLiked, setIsLiked] = useState(false);
  function likedMovie() { setIsLiked(!isLiked); }

  return (
    <article className='movies-card'>
      <img className='movies-card__photo' src={cardImage} alt='постер фильма' />
      <div className='movies-card__info'>
        <div className='movies-card__text'>
          <h3 className='movies-card__title'>{movie.nameRU}</h3>
          <p className='movies-card__duration'>{`${hours}ч ${minutes}м`}</p>
        </div>
        <button
          className={`movies-card__button ${isLiked ? 'movies-card__button_active' : ''}`}
          onClick={likedMovie}
          id="button-like"
          type="button"
          name="like"
        />
      </div>
    </article>
  )
}

export default MoviesCard;