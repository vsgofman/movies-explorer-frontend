import { useLocation } from 'react-router-dom';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export function BlockPage({ loggedIn, children }) {
  let location = useLocation();
  const footerRender = location.pathname !== '/profile';

  return (
    <>
      <Header loggedIn={loggedIn} />
      {children}
      {footerRender && <Footer />}
    </>
  )
}