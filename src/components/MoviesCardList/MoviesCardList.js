import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import CardListInfo from '../CardListInfo/CardListInfo';
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/constants';


function MoviesCardList({ movies, showAllMovies, handleShowAllMovies }) {
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
            <MoviesCard movie={movie} key={movie._id} />
          ))
        }
      </div>
      {!getLocalStorageItem('showAllMovies') && movies.length === 0 &&
        <CardListInfo
          text={'Введите запрос для поиска'}
        />
      }
      {getLocalStorageItem('shortMovies') && getLocalStorageItem('foundMovies') && movies.length === 0 &&
        <CardListInfo
          text={'Ничего не найдено'}
        />}
      {getLocalStorageItem('foundMovies') && movies.length === 0 &&
        <CardListInfo
          text={'Ничего не найдено'}
        />}

      {!getLocalStorageItem('showAllMovies') &&
        <button onClick={handleShowAllMovies}>Показать все фильмы</button>
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