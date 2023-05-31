import { Link, NavLink } from 'react-router-dom';
import './Menu.css';
import iconProfile from '../../images/icon-profile.png';

function Menu() {
  return (
    <>
      <button className='menu__button_open' />
      <div className='menu'>
        <div className='menu__container'>
          <button className='menu__button_close' />
          <div className='menu__block'>
            <NavLink className='menu__link' to='/'>Главная</NavLink>
            <NavLink className='menu__link' to='/movies'>Фильмы</NavLink>
            <NavLink className='menu__link' to='/saved-movies'>Сохранённые фильмы</NavLink>
          </div>
          <Link className='menu__link menu__link_profile' to='/profile'>
            <img className='menu__img' src={iconProfile} alt='значок профиля' />
            <p className='menu__text'>Аккаунт</p>
          </Link>
        </div>
      </div>
    </>

  )
}

export default Menu;