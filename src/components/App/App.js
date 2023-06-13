import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllMovies } from '../../utils/MoviesApi';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/constants';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") || true
  );
  const [currentUser, setCurrentUser] = useState({});
  const [shortMoviesOnly, setShortMoviesOnly] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    let checkbox = getLocalStorageItem('checkbox');
    let foundMovies = getLocalStorageItem('foundMovies');
    let shortMovies = getLocalStorageItem('shortMovies');
    if (foundMovies) {
      setShortMoviesOnly(checkbox)
      setSearchInputValue(getLocalStorageItem('inputValue'))
      if (checkbox === true) {
        setMoviesList(shortMovies);
        return;
      } else if (checkbox === false) {
        setMoviesList(shortMovies);
        return;
      } else if (shortMovies.length !== 0) {
        // выводим ничего не найдено
        console.log('ничего не найдено');
      }
    }
    if (getLocalStorageItem('showAllMovies')) {
      setMoviesList(getLocalStorageItem('allMovies'));
    }
  }, [])

  useEffect(() => {
    setIsLoading(true);
    getAllMovies()
      .then((allMovies) => {
        setLocalStorageItem(allMovies, 'allMovies');
      }).catch((err) => console.log(`Данные не загрузились. ${err}`))
      .finally(() => setIsLoading(false))
  }, [])

  function toggleShortMovies() {
    setShortMoviesOnly(!shortMoviesOnly);
    setLocalStorageItem(!shortMoviesOnly, 'checkbox')
    handleCheckbox(!shortMoviesOnly)
  }

  function handleCheckbox(checkbox) {
    let shortMovies
    if (getLocalStorageItem('foundMovies')) {
      if (checkbox === true) {
        shortMovies = (getLocalStorageItem('foundMovies')).filter((movie) => movie.duration <= 40);
      } else {
        setMoviesList(getLocalStorageItem('foundMovies'));
        return;
      }
    } else if (!getLocalStorageItem('foundMovies') && getLocalStorageItem('showAllMovies') === true) {
      if (checkbox === true) {
        shortMovies = (getLocalStorageItem('allMovies')).filter((movie) => movie.duration <= 40);
      } else {
        setMoviesList(getLocalStorageItem('allMovies'))
        localStorage.removeItem('shortMovies')
        return;
      }
    } else if (!getLocalStorageItem('foundMovies') && getLocalStorageItem('showAllMovies') !== true) {
      setMoviesList([])
      return;
    }
    setMoviesList(shortMovies)
    setLocalStorageItem(shortMovies, 'shortMovies')
    return;
  }

  function searchMovies() {
    let foundMovies = getLocalStorageItem('allMovies').filter((movie) => (
      movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())
    ))
    setLocalStorageItem(foundMovies, 'foundMovies');
    setLocalStorageItem(searchInputValue, 'inputValue')
    setLocalStorageItem(true, 'showAllMovies');
    setShowAllMovies(true)
    setShortMoviesOnly(false)
    setLocalStorageItem(false, 'checkbox');
    setMoviesList(foundMovies)
  }

  function handleShowAllMovies() {
    setShowAllMovies(true);
    setLocalStorageItem(true, 'showAllMovies')
    setShortMoviesOnly(false)
    setLocalStorageItem(false, 'checkbox');
    setMoviesList(getLocalStorageItem('allMovies'));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        {isLoading ?
          <Preloader /> :
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
                    movies={moviesList}
                    loggedIn={loggedIn}
                    shortMoviesOnly={shortMoviesOnly}
                    setShortMoviesOnly={setShortMoviesOnly}
                    searchMovies={searchMovies}
                    selectShortMovies={toggleShortMovies}
                    searchInputValue={searchInputValue}
                    setSearchInputValue={setSearchInputValue}
                    setMoviesList={setMoviesList}
                    handleShowAllMovies={handleShowAllMovies}
                    showAllMovies={showAllMovies}

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
          </div>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
