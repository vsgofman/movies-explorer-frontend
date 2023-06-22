import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import CardListInfo from '../CardListInfo/CardListInfo';
import { getLocalStorageItem } from '../../utils/constants';


function MoviesCardList({ movies, savedMovies, showAllMovies, onSavedClick, handleShowAllMovies, handleAddFavorites, handleRemoveFavorites, savedMoviesPage }) {
  const [amountCards, setAmountCards] = useState(12);
  useEffect(() => {
    let timer;
    const changeAmountTimer = () => {
      timer = setTimeout(changeAmountInWidth, 1000);
    };
    window.addEventListener("resize", changeAmountTimer);
  });

  function changeAmountInWidth() {
    if (window.innerWidth < 651) {
      return setAmountCards(5);
    }
    if (window.innerWidth < 918) {
      return setAmountCards(8);
    }
    setAmountCards(12);
  };

  function handleMoreMovies() {
    if (window.innerWidth > 917) {
      return setAmountCards(amountCards + 3);
    }
    if (window.innerWidth < 918) {
      return setAmountCards(amountCards + 2);
    }
  };

  return (
    <section className='movies-list'>
      <div className='movies-list__block'>
        {
          movies.slice(0, amountCards).map((movie, i) => (
            <MoviesCard
              movie={movie}
              onSavedClick={onSavedClick}
              key={movie.id || movie._id}
              isSaved={savedMovies.find((item) => item.movieId === movie.id)}
              savedMovies={savedMovies}
              savedMoviesPage={savedMoviesPage}
              handleAddFavorites={handleAddFavorites}
              handleRemoveFavorites={handleRemoveFavorites}
            />
          ))
        }
      </div>
      {savedMoviesPage && movies.length === 0 &&
        <CardListInfo
          text={'Ничего не найдено'}
        />
      }
      {(!savedMoviesPage &&
        (getLocalStorageItem('shortMovies') || getLocalStorageItem('foundMovies')) &&
        movies.length === 0) &&
        <CardListInfo
          text={'Ничего не найдено'}
        />
      }
      {!showAllMovies && movies.length === 0 && !savedMoviesPage &&
        <CardListInfo
          text={'Введите запрос для поиска'}
        />
      }
      {!showAllMovies && !savedMoviesPage &&
        <button
          className='movies-list__button-show'
          onClick={handleShowAllMovies}
        >
          Показать все фильмы
        </button>
      }
      {amountCards < movies.length && (<button
        className='movies-list__button'
        id="button-more"
        type="button"
        name="more"
        onClick={handleMoreMovies}
      >
        Eщё
      </button>)}
    </section>
  )
}

export default MoviesCardList;