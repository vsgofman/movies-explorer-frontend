import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ movies }) {
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
  }

  return (
    <section className='movies-list'>
      <div className='movies-list__block'>
        {
          movies.slice(0, amountCards).map((movie, i) => (
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