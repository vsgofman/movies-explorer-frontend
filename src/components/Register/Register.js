import './Register.css';
import StartPage from '../StartPage/StartPage';

function Register() {
  return (
    <StartPage
      title='Добро пожаловать!'
      textButtonSubmit='Зарегистрироваться'
      textButtonRedirect='Войти'
      questionToRedirect='Уже зарегистрированы?'
      redirectTo='/signin'>
      <div className='start-page__input-block'>
        <p className='form__caption'>Имя</p>
        <input
          id="name-input"
          className="start-page__input"
          name="register-name" 
          required
        />
      </div>
    </StartPage>
  )
}

export default Register;