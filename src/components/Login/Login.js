import './Login.css';
import StartPage from '../StartPage/StartPage';

function Login() {
  return (
    <StartPage
      title='Рады видеть!'
      textButtonSubmit='Войти'
      textButtonRedirect='Регистрация'
      questionToRedirect='Ещё не зарегистрированы?'
      redirectTo='/signup'
      />
  )
}

export default Login;