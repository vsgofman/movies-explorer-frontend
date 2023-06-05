import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';
import Navigation from '../Navigation/Navigation';
// import Menu from '../Menu/Menu';

function Header({ loggedIn }) {
  let location = useLocation();
  const addModifier = location.pathname === '/';

  return (
    <header className={`header ${addModifier ? 'header_about-project' : ''}`}>
      <Link className='header__link' to='/'>
        <img className='header__logo' src={logo} alt='логотип' />
      </Link>
      {loggedIn ? <Navigation /> : <NavTab />}
    </header>
  )
}

export default Header;