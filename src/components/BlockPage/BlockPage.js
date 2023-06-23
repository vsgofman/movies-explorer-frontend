import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export function BlockPage({ loggedIn, location, isOpen, onClose, handleNavClick, children }) {
  const footerRender = location.pathname !== '/profile';
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        onClose={onClose}
        handleNavClick={handleNavClick}
      />
      {children}
      {footerRender && <Footer />}
    </>
  )
}