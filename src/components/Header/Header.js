import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  let location = useLocation();
  const addModifier = location.pathname === '/';

  return (
    <header className={`header ${addModifier ? 'header_about-project' : ''}`}>
      <img className='header__logo' src={logo} alt='логотип' />
      {loggedIn ? <Navigation /> : <NavTab />}
    </header>
  )
}

export default Header;