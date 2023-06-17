import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect, useCallback } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

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
import mainApi from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';
import { register, authorize } from '../../utils/Auth';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') || false
  );
  const [currentUser, setCurrentUser] = useState({});
  const [shortMoviesOnly, setShortMoviesOnly] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt')
    mainApi.setHeaderToken(jwt)
    if (jwt !== null) mainApi.getProfile()
      .then((res) => {
        setCurrentUser(res)
        setLoggedIn(true)
        setLocalStorageItem(true, 'loggedIn')
        navigate(location.pathname)
      }).catch((err) => console.log(`Некорректный токен. ${err}`))
  }, [navigate])

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    mainApi.getSavedMovies()
      .then(res => {
        console.log(res);
        setSavedMovies(res)
        setLocalStorageItem(res, 'savedMovies')
      })
      .catch((err) => console.log(`Данные не загрузились. ${err}`))
  }, [loggedIn])

  useEffect(() => {
    let checkbox = getLocalStorageItem('checkbox');
    let foundMovies = getLocalStorageItem('foundMovies');
    let shortMovies = getLocalStorageItem('shortMovies');
    if (foundMovies) {
      setShortMoviesOnly(checkbox)
      setSearchInputValue(getLocalStorageItem('inputValue'))
      if (checkbox === true) {
        setMoviesList(shortMovies);
        setShortMoviesOnly(checkbox);
        return;
      } else if (checkbox === false) {
        setMoviesList(foundMovies);
        return;
      } else if (shortMovies.length !== 0) {
        // выводим ничего не найдено
        console.log('ничего не найдено');
      }
    }
    if (getLocalStorageItem('showAllMovies')) {
      if (checkbox === true) {
        setShortMoviesOnly(checkbox);
        setMoviesList(shortMovies);
        return;
      } else if (checkbox === false) {
        setMoviesList(getLocalStorageItem('allMovies'));
        return;
      }
    }
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
    if (getLocalStorageItem('allMovies' === null)) {
      setIsLoading(true);
      getAllMovies()
        .then((allMovies) => {
          setLocalStorageItem(allMovies, 'allMovies');
        }).catch((err) => console.log(`Данные не загрузились. ${err}`))
        .finally(() => setIsLoading(false))
    }
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

  function handleRegister({ name, email, password }) {
    console.log(name, email, password);
    console.log(JSON.stringify({ name, email, password }));
    register(name, email, password)
      .then((res) => {
        console.log(res);
        console.log('всё ок');
        // setModalResponse({ open: true, status: true });
        // navigate("/sign-in");
      }).catch((err) => console.log(`Ошибка регистрации ${err}`))
    // .catch(() => setModalResponse({ open: true, status: false }))
  }

  function handleLogin({ email, password }) {
    authorize(email, password)
      .then(res => {
        localStorage.setItem("jwt", res.token)
        mainApi.setHeaderToken(res.token)
      }).then(() => {
        console.log('логин ок');
        navigate('/movies');
        // tokenCheck()
        // setLoggedIn(true)
      }).catch(err => console.log(`Не удаётся войти. ${err}`))
  }

  function handleUpdateUser({ name, email }) {
    mainApi.editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
      }).catch(err => console.log(`Данные профиля не были обновлены. ${err}`))
    // тут можно вывести модалку с ошибкой и успешным обновлением
  }



  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('showAllMovies');
    // api.setHeaderToken(null)
    // navigate("/signin")
  }

  function handleAddFavorites(movie) {
    mainApi.saveMovie(movie)
      .then(res => {
        setSavedMovies(savedMovies.concat(res));
      }).catch((err) => console.log(`Фильм не сохранился. ${err}`))
  }

  function handleRemoveFavorites(movie) {
    mainApi.deleteMovie(movie._id)
      .then(setSavedMovies((state) => state.filter((stateItem) => stateItem._id !== movie._id)))
      .catch((err) => console.log(`Не удалось удалить фильм. ${err}`))
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
                    handleAddFavorites={handleAddFavorites}
                    handleRemoveFavorites={handleRemoveFavorites}
                  />}
              />
              <Route path='/saved-movies'
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    loggedIn={loggedIn}
                    movies={savedMovies}
                    shortMoviesOnly={shortMoviesOnly}
                    setShortMoviesOnly={setShortMoviesOnly}
                    selectShortMovies={toggleShortMovies}
                    searchMovies={searchMovies}
                    searchInputValue={searchInputValue}
                    setSearchInputValue={setSearchInputValue}

                    handleAddFavorites={handleAddFavorites}
                    handleRemoveFavorites={handleRemoveFavorites}
                  />}
              />
              <Route path='/profile'
                element={
                  <ProtectedRoute
                    element={Profile}
                    loggedIn={loggedIn}
                    signOut={signOut}
                    onUpdateUser={handleUpdateUser}
                  />}
              />
              <Route path='/signin'
                element={<Login
                  onFormSubmit={handleLogin}
                />}
              />
              <Route path='/signup'
                element={<Register
                  onFormSubmit={handleRegister}
                />}
              />
              <Route
                path="*"
                element={loggedIn ? (<Navigate to='/' />) : (<PageNotFound />)}
              />
            </Routes>
          </div>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
