import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export function BlockPage({ loggedIn, location, children }) {
  const footerRender = location.pathname !== '/profile';
  return (
    <>
      <Header loggedIn={loggedIn} />
      {children}
      {footerRender && <Footer />}
    </>
  )
}