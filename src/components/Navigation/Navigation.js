import { useLocation, Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import iconProfile from '../../images/icon-profile.png';

function Navigation() {
  let location = useLocation();
  const addModifier = location.pathname === '/';

  return (
    <>
      <button className={`navigation__button_open ${addModifier ? 'navigation__button_main' : ''}`} />
      <section className='navigation'>
        <div className='navigation__container'>
          <button className='navigation__button_close' />
          <div className='navigation__block'>
            <NavLink className='navigation__link navigation__link_main' to='/'>Главная</NavLink>
            <NavLink className='navigation__link navigation__link_movies' to='/movies'>Фильмы</NavLink>
            <NavLink className='navigation__link navigation__link_saved-movies' to='/saved-movies'>Сохранённые фильмы</NavLink>
          </div>
          <Link className='navigation__link navigation__link_profile' to='/profile'>
            <img className='navigation__img' src={iconProfile} alt='значок профиля' />
            <p className='navigation__text'>Аккаунт</p>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Navigation;