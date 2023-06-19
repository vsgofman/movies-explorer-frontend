import StartPage from '../StartPage/StartPage';
import { FormHandler } from '../../utils/FormHandler';

function Login({ onFormSubmit }) {
  const { inputValues, handleChange } = FormHandler();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!inputValues.email || !inputValues.password) return
    onFormSubmit(inputValues);
  }

  return (
    <StartPage
      title='Рады видеть!'
      textButtonSubmit='Войти'
      textButtonRedirect='Регистрация'
      questionToRedirect='Ещё не зарегистрированы?'
      redirectTo='/signup'
      onFormSubmit={handleSubmit}
    >
      <div className='input-block start-page__input-block'>
        <p className='form__caption'>E-mail</p>
        <input
          id="email-input"
          className="start-page__input"
          type="email" name="email"
          onChange={handleChange}
          value={inputValues.email || ''}
          required
        />
      </div>
      <div className='input-block start-page__input-block'>
        <p className='form__caption'>Пароль</p>
        <input
          id="password-input"
          className="start-page__input"
          type="password" name="password"
          onChange={handleChange}
          value={inputValues.password || ''}
          required
        />
        <span className='input-block__error'>Что-то пошло не так...</span>
      </div>
    </StartPage>
  )
}

export default Login;