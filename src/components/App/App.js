import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllMovies } from '../../utils/MoviesApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((moviesData) => {
        setAllMovies(moviesData);
      }).catch((err) => console.log(`Данные не загрузились. ${err}`))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='page'>
          <Routes>
            <Route path='/' element={
              <Main
                loggedIn={loggedIn}
              />
            } />
            <Route path='/movies'
              element={
                <ProtectedRoute
                  element={Movies}
                  movies={allMovies}
                  loggedIn={loggedIn}
                />}
            />
            <Route path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                />}
            />
            <Route path='/profile'
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                />}
            />
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
