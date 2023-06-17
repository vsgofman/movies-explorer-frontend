import './StartPage.css';
import logo from '../../images/logo.svg';
import StartPageForm from '../StartPageForm/StartPageForm';
import { Link } from 'react-router-dom';

function StartPage({ title, textButtonSubmit, textButtonRedirect, questionToRedirect, redirectTo, onFormSubmit, children }) {

  return (
    <section className="start-page">
      <img className='start-page__logo' src={logo} alt='логотип' />
      <h2 className="start-page__title">{title}</h2>
      <StartPageForm>
        {children}
      </StartPageForm>
      <button
        className="start-page__button"
        type="submit"
        form="start-page__form"
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