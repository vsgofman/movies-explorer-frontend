import { NavLink } from 'react-router-dom';
import './Navigation.css';
import iconProfile from '../../images/icon-profile.png';

function Navigation() {
  return (
    <section className='navigation'>
      <NavLink className='navigation__link navigation__link_movies' to='/movies'>Фильмы</NavLink>
      <NavLink className='navigation__link navigation__link_saved-movies' to='/saved-movies'>Сохранённые фильмы</NavLink>
      <NavLink className='navigation__link navigation__link_profile' to='/profile'>
        <img className='menu__img' src={iconProfile} alt='значок профиля' />
        <p className='menu__text'>Аккаунт</p>
      </NavLink>
    </section>
  )
}

export default Navigation;