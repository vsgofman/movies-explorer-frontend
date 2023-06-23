import { Link, NavLink } from 'react-router-dom';
import iconProfile from '../../images/icon-profile.png';
import './Menu.css';


function Menu({ isOpen, onClose }) {
  return (
    <section className={`menu ${isOpen ? 'menu_opened' : ''}`}>
      <div className='menu__container'>
        <button
          className={`menu__button-close ${isOpen ? 'menu__button-close_visible' : ''}`}
          onClick={onClose}
        />
        <nav className='menu__block'>
          <NavLink className='menu__link menu__link_to_main' to='/'
            onClick={onClose}>
            Главная
          </NavLink>
          <NavLink className='menu__link menu__link_to_movies' to='/movies'
            onClick={onClose}>
            Фильмы
          </NavLink>
          <NavLink className='menu__link menu__link_to_saved-movies' to='/saved-movies'
            onClick={onClose}>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link className='menu__link menu__link_to_profile' to='/profile' onClick={onClose}>
          <img className='menu__img' src={iconProfile} alt='значок профиля' />
          <p className='menu__text'>Аккаунт</p>
        </Link>
      </div>
    </section>
  )
}

export default Menu;