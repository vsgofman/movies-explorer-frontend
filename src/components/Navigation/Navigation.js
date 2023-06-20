import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import iconProfile from '../../images/icon-profile.png';

function Navigation() {
  return (
    <section className='navigation'>
      <div className='navigation__container'>
        <nav className='navigation__block'>
          <NavLink className='navigation__link navigation__link_to_movies' to='/movies'>Фильмы</NavLink>
          <NavLink className='navigation__link navigation__link_to_saved-movies' to='/saved-movies'>Сохранённые фильмы</NavLink>
        </nav>
        <Link className='navigation__link navigation__link_to_profile' to='/profile'>
          <img className='navigation__img' src={iconProfile} alt='значок профиля' />
          <p className='navigation__text'>Аккаунт</p>
        </Link>
      </div>
    </section>
  )
}

export default Navigation;