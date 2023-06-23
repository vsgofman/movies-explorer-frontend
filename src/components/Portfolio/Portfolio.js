import '../App/App.css';
import './Portfolio.css';
import linkArrow from '../../images/link-arrow.png';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='wrapper'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='block portfolio__block'>
          <li className='block__item'>
            <a className='link portfolio__link' href='https://vsgofman.github.io/how-to-learn/' target='_blank' rel='noreferrer'>
              <p className='link__text'>Статичный сайт</p>
              <img className='link__img' src={linkArrow} alt='стрелка' />
            </a>
          </li>
          <li className='block__item'>
            <a className='link portfolio__link' href='https://vsgofman.github.io/russian-travel/' target='_blank' rel='noreferrer'>
              <p className='link__text'>Адаптивный сайт</p>
              <img className='link__img' src={linkArrow} alt='стрелка' />
            </a>
          </li>
          <li className='block__item'>
            <a className='link portfolio__link' href='https://vsgofman.github.io/react-mesto-auth/' target='_blank' rel='noreferrer'>
              <p className='link__text'>Одностраничное приложение</p>
              <img className='link__img' src={linkArrow} alt='стрелка' />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;