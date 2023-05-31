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
      <input
        id="name-input"
        className="start-page__input"
        name="register-name" placeholder="Имя" required
      />
    </StartPage>
  )
}

export default Register;