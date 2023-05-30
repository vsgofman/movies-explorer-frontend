import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';

function Header() {
  let location = useLocation();
  const addModifier = location.pathname === '/';

  return (
    <header className={`header ${addModifier ? 'header_about-project' : ''}`}>
      <img className='header__logo' src={logo} alt='логотип' />
      <NavTab />
    </header>
  )
}

export default Header;