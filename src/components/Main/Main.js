import { BlockPage } from '../BlockPage/BlockPage';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import './Main.css';

function Main({ loggedIn, location }) {
  return (
    <BlockPage loggedIn={loggedIn} location={location}>
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