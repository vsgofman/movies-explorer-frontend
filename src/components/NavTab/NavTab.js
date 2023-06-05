import { NavLink } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <nav className='navtab'>
      <NavLink className='navtab__link' to='/signup'>Регистрация</NavLink>
      <NavLink className='navtab__link navtab__link-button' to='/signin'>Войти</NavLink>
    </nav>
  )
}

export default NavTab;