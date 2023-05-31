import './StartPage.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function StartPage({ title, textButtonSubmit, textButtonRedirect, questionToRedirect, redirectTo, children }) {
  return (
    <section className="start-page">
      <img className='start-page__logo' src={logo} alt='логотип' />
      <h2 className="start-page__title">{title}</h2>
      <form className="form start-page__form">
        {children}
        <input
          id="email-input"
          className="start-page__input"
          type="email" name="email" placeholder="Email" required
        />
        <input
          id="password-input"
          className="start-page__input"
          type="password" name="password" placeholder="Пароль" required
        />
        <button
          className="start-page__button"
          type="submit" aria-label={textButtonSubmit}>{textButtonSubmit}</button>
      </form>
      <div className="start-page__signup">
        <p className="start-page__signup-text">{questionToRedirect}</p>
        <Link to={redirectTo} className="start-page__signup-link">{textButtonRedirect}</Link>
      </div>
    </section>
  )
}

export default StartPage;