import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='page'>
          <Routes>
            <Route path='/' element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            } />
            <Route path='/movies' element={
              <>
                <Header loggedIn={loggedIn} />
                <Movies />
                <Footer />
              </>
            } />
            <Route path='/saved-movies' element={
              <>
                <Header loggedIn={loggedIn} />
                <SavedMovies />
                <Footer />
              </>
            } />
            <Route path='/profile' element={
              <>
                <Header loggedIn={loggedIn} />
                <Profile />
              </>
            } />
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
