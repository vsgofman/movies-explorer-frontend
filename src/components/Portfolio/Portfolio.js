import './Portfolio.css';
import linkArrow from '../../images/link-arrow.png';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <a className='portfolio__link' href='https://vsgofman.github.io/how-to-learn/'>
        <p className='link__text'>Статичный сайт</p>
        <img className='link__img' src={linkArrow} alt='стрелка' />
      </a>
      <a className='portfolio__link' href='https://vsgofman.github.io/russian-travel/'>
        <p className='link__text'>Адаптивный сайт</p>
        <img className='link__img' src={linkArrow} alt='стрелка' />
      </a>
      <a className='portfolio__link' href='https://vsgofman.github.io/react-mesto-auth/'>
        <p className='link__text'>Одностраничное приложение</p>
        <img className='link__img' src={linkArrow} alt='стрелка' />
      </a>
    </section >
  )
}

export default Portfolio;