import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import CardListInfo from '../CardListInfo/CardListInfo';
import { getLocalStorageItem } from '../../utils/constants';
import { quantityCards, quantityCardsAdd, widthScreen } from '../../utils/constants';


function MoviesCardList({ movies, savedMovies, showAllMovies, onSavedClick, handleShowAllMovies, handleAddFavorites, handleRemoveFavorites, savedMoviesPage }) {
  const { QUANTITY_CARDS_S, QUANTITY_CARDS_M, QUANTITY_CARDS_L } = quantityCards();
  const { QUANTITY_CARDS_ADD_S, QUANTITY_CARDS_ADD_M } = quantityCardsAdd();
  const { WIDTH_SCREEN_S, WIDTH_SCREEN_M } = widthScreen();
  const [amountCards, setAmountCards] = useState(QUANTITY_CARDS_L);

  useEffect(() => {
    let timer;
    const changeAmountTimer = () => {
      timer = setTimeout(changeAmountInWidth, 1000);
    };
    window.addEventListener("resize", changeAmountTimer);
  });

  function changeAmountInWidth() {
    if (window.innerWidth < WIDTH_SCREEN_S) {
      return setAmountCards(QUANTITY_CARDS_S);
    }
    if (window.innerWidth <= WIDTH_SCREEN_M) {
      return setAmountCards(QUANTITY_CARDS_M);
    }
    setAmountCards(12);
  };

  function handleMoreMovies() {
    if (window.innerWidth > WIDTH_SCREEN_M) {
      return setAmountCards(amountCards + QUANTITY_CARDS_ADD_M);
    }
    if (window.innerWidth <= WIDTH_SCREEN_M) {
      return setAmountCards(amountCards + QUANTITY_CARDS_ADD_S);
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