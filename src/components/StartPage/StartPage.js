import './StartPage.css';
import logo from '../../images/logo.svg';
import StartPageForm from '../StartPageForm/StartPageForm';
import { Link } from 'react-router-dom';

function StartPage({ title, textButtonSubmit, textButtonRedirect, questionToRedirect, redirectTo, onFormSubmit, inputValues, inputErrors, children }) {

  const buttonInactive =
    !((inputErrors.email === '' && inputErrors.name === '' && inputErrors.password === '') ||
      (inputErrors.email === '' && inputErrors.password === ''));

  return (
    <section className="start-page">
      <Link className='start-page__link' to='/'>
        <img className='start-page__logo' src={logo} alt='логотип' />
      </Link>
      <h2 className="start-page__title">{title}</h2>
      <StartPageForm>
        {children}
      </StartPageForm>
      <button
        className={`start-page__button ${buttonInactive && 'start-page__button_disabled'}`}
        type="submit"
        form="start-page__form"
        disabled={buttonInactive}
        onClick={onFormSubmit}
        aria-label={textButtonSubmit}>{textButtonSubmit}
      </button>
      <div className="redirect start-page__redirect">
        <p className="redirect__text">{questionToRedirect}</p>
        <Link to={redirectTo} className="redirect__link">{textButtonRedirect}</Link>
      </div>
    </section>
  )
}

export default StartPage;