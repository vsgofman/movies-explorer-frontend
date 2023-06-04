import './StartPage.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function StartPage({ title, textButtonSubmit, textButtonRedirect, questionToRedirect, redirectTo, children }) {
  return (
    <section className="start-page">
      <img className='start-page__logo' src={logo} alt='логотип' />
      <h2 className="start-page__title">{title}</h2>
      <form className="form start-page__form" id="start-page__form">
        {children}
        <div className='start-page__input-block'>
          <p className='form__caption'>E-mail</p>
          <input
            id="email-input"
            className="start-page__input"
            type="email" name="email" required
          />
        </div>
        <div className='start-page__input-block'>
          <p className='form__caption'>Пароль</p>
          <input
            id="password-input"
            className="start-page__input"
            type="password" name="password" required
          />
          <span className='input__error'>Что-то пошло не так...</span>
        </div>
      </form>
      <button
        className="start-page__button"
        type="submit"
        form="start-page__form"
        aria-label={textButtonSubmit}>{textButtonSubmit}
      </button>
      <div className="start-page__redirect">
        <p className="redirect__text">{questionToRedirect}</p>
        <Link to={redirectTo} className="redirect__link">{textButtonRedirect}</Link>
      </div>
    </section>
  )
}

export default StartPage;