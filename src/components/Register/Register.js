import './Register.css';
import StartPage from '../StartPage/StartPage';
import { useFormHandler } from '../../utils/useFormHandler';
import { REGEX_EMAIL, ERR_MESSAGE_EMAIL } from '../../utils/constants';

function Register({ onFormSubmit }) {
  const { inputValues, inputErrors, handleChange } = useFormHandler();

  function handleSubmit(evt) {
    evt.preventDefault();
    onFormSubmit({
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
    })
  }

  return (
    <StartPage
      title='Добро пожаловать!'
      textButtonSubmit='Зарегистрироваться'
      textButtonRedirect='Войти'
      questionToRedirect='Уже зарегистрированы?'
      redirectTo='/signin'
      onFormSubmit={handleSubmit}
      inputValues={inputValues}
      inputErrors={inputErrors}
    >
      <div className='input-block start-page__input-block'>
        <p className='form__caption'>Имя</p>
        <input
          id="name-input"
          className={`start-page__input ${inputErrors.name && 'start-page__input_type_error'}`}
          name="name"
          onChange={handleChange}
          value={inputValues.name || ''}
          minLength='2'
          maxLength='30'
          required
        />
        <span className='input-block__error'>{inputErrors.name}</span>
      </div>
      <div className='input-block start-page__input-block'>
        <p className='form__caption'>E-mail</p>
        <input
          id="email-input"
          className={`start-page__input ${inputErrors.email && 'start-page__input_type_error'}`}
          type="email" name="email"
          onChange={handleChange}
          value={inputValues.email || ''}
          pattern={REGEX_EMAIL}
          required
        />
        <span className='input-block__error'>{inputErrors?.email && ERR_MESSAGE_EMAIL}</span>
      </div>
      <div className='input-block start-page__input-block'>
        <p className='form__caption'>Пароль</p>
        <input
          id="password-input"
          className={`start-page__input ${inputErrors.password && 'start-page__input_type_error'}`}
          type="password" name="password"
          onChange={handleChange}
          value={inputValues.password || ''}
          required
        />
        <span className='input-block__error'>{inputErrors.password}</span>
      </div>
    </StartPage>
  )
}

export default Register;