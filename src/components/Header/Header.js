import './Header.css';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';

function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='логотип' />
      <NavTab />
    </header>
  )
}

export default Header;