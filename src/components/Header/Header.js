import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import '../App/App.css';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, isOpen, onClose, handleNavClick }) {
  let location = useLocation();
  const modColorAdd = location.pathname === '/';
  const mainPage = location.pathname === '/';
  const showButton = (mainPage && loggedIn) || (!mainPage && loggedIn);

  return (
    <header className={`header ${modColorAdd ? 'header_theme_pink' : ''}`}>
      <div className='wrapper header_wrapper'>
        <Link className='header__link' to='/'>
          <img className='header__logo' src={logo} alt='логотип' />
        </Link>
        {showButton && <button
          className={`button-menu header__button-menu ${modColorAdd ? 'button-menu_theme_pink' : ''}`}
          onClick={handleNavClick}
        />}
        {loggedIn ? <Navigation isOpen={isOpen} onClose={onClose} /> : <NavTab />}
      </div>
    </header>
  )
}

export default Header;