import './MoviesCard.css';
import { React } from 'react';

function MoviesCard(props) {
  const {
    movie,
    isSaved,
    savedMovies,
    savedMoviesPage,
    handleAddFavorites,
    handleRemoveFavorites,
  } = props;

  const urlImage = savedMoviesPage ? movie.image : `https://api.nomoreparties.co${movie.image.url}`;
  const buttonClassName = savedMoviesPage ? 'movies-card__button_delete' : `movies-card__button_like ${isSaved && 'movies-card__button_like_active'}`;

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  function handleButtonClick() {
    if (savedMoviesPage) {
      handleRemoveFavorites(movie)
    } else {
      if (isSaved) {
        const removeMovie = savedMovies.filter(saveMovie => saveMovie.movieId === movie.id);
        handleRemoveFavorites(removeMovie.shift());
      } else {
        handleAddFavorites(movie)
      }
    }
  }

  return (
    <article className='movies-card'>
      <a className='movies-card__trailer-link' href={movie.trailerLink} target='_blank' rel="noreferrer">
        <img className='movies-card__photo' src={urlImage} alt='постер фильма' />
      </a>
      <div className='movies-card__info'>
        <div className='movies-card__text'>
          <h3 className='movies-card__title'>{movie.nameRU}</h3>
          <p className='movies-card__duration'>{`${hours}ч ${minutes}м`}</p>
        </div>
        <button
          className={`movies-card__button ${buttonClassName}`}
          onClick={handleButtonClick}
          id="button-like"
          type="button"
          name="like"
        />
      </div>
    </article>
  )
}

export default MoviesCard;