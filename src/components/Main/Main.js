import { BlockPage } from '../BlockPage/BlockPage';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import './Main.css';

function Main({ loggedIn, location, isOpen, onClose, handleNavClick }) {
  return (
    <BlockPage
      loggedIn={loggedIn}
      location={location}
      isOpen={isOpen}
      onClose={onClose}
      handleNavClick={handleNavClick}
    >
      <main className='content'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
    </BlockPage>
  )
}

export default Main;