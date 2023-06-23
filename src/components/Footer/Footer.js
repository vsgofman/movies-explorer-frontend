import '../App/App.css';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='wrapper'>
        <p className='footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__block'>
          <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
          <div className='footer__links'>
            <a className='footer__link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
            <a className='footer__link' href='https://github.com/'>Github</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;