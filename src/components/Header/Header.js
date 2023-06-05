import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';
import Navigation from '../Navigation/Navigation';
// import Menu from '../Menu/Menu';

function Header({ loggedIn }) {
  let location = useLocation();
  const addModColor = location.pathname === '/';

  return (
    <header className={`header ${addModColor ? 'header_color_pink' : ''}`}>
      <Link className='header__link' to='/'>
        <img className='header__logo' src={logo} alt='логотип' />
      </Link>
      <button className={`button-menu header__button-menu ${addModColor ? 'button-menu_color_pink' : ''}`} />
      {loggedIn ? <Navigation /> : <NavTab />}
    </header>
  )
}

export default Header;