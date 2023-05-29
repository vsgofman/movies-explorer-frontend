import { NavLink } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <div className='navtab'>
      <NavLink className='navtab__link' to='/signup'>Регистрация</NavLink>
      <NavLink className='navtab__link navtab__link_button' to='/signin'>Войти</NavLink>
    </div>
  )
}

export default NavTab;