import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import './Main.css';

function Main() {
  return (
    <main className='content'>
      <Promo />
      <AboutProject />
    </main>
  )
}

export default Main;