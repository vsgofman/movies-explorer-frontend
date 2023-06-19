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
  const [savedMovies, setSavedMovies] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [foMovies, setFoMovies] = useState([]);


  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(
    localStorage.getItem('showAllMovies') || false
  );
  const [moviesList, setMoviesList] = useState([]);
  const [allMovies, setAllMovies] = useState(
    getLocalStorageItem('allMovies') || []);
  const [searchInputValue, setSearchInputValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt')
    mainApi.setHeaderToken(jwt)
    if (jwt !== null) mainApi.getProfile()
      .then((res) => {
        setCurrentUser(res)
        setLoggedIn(true)
        setLocalStorageItem(true, 'loggedIn')
        navigate(location.pathname)
        console.log('tokenCheck');
      }).catch((err) => console.log(`Некорректный токен. ${err}`))
  }, [navigate])

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi.getSavedMovies()
        .then(savedMovies => {
          setSavedMovies(savedMovies)
          console.log('11');
          setLocalStorageItem(savedMovies, 'savedMovies')
        })
        .catch((err) => console.log(`Данные не загрузились. ${err}`))
        .finally(() => setIsLoading(false))
    }
  }, [loggedIn])

  useEffect(() => {
    let checkbox = getLocalStorageItem('checkbox');
    let foundMovies = getLocalStorageItem('foundMovies');
    let shortMovies = getLocalStorageItem('shortMovies');
    let inputValue = getLocalStorageItem('inputValue');
    setFoMovies(foundMovies)
    if (shortMovies !== null) {
      console.log('shortMovies !== null');
      setMoviesList(shortMovies);
      setIsShortMovies(checkbox);
      setSearchInputValue(inputValue);
      return;
    } else {
      console.log('shortMovies === null');
      if (foundMovies !== null) {
        setMoviesList(foundMovies);
        setIsShortMovies(checkbox);
        setSearchInputValue(inputValue);
        return;
      } else {
        setMoviesList(allMovies);
        return;
      }
    }
  }, [])

  function sortMoviesByLength(movies) {
    const sortMovies = movies.filter((movie) => {
      return movie.duration < 40;
    });
    return sortMovies;
  }

  function findMovies(movies, inputValue) {
    const foundMovies = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(inputValue.toLowerCase())
    });
    return foundMovies;
  }

  function searchMovies() {
    if (!getLocalStorageItem('allMovies')) {
      setIsLoading(true);
      getAllMovies()
        .then((allMovies) => {
          setLocalStorageItem(allMovies, 'allMovies');
          setAllMovies(allMovies)
          let foundMovies = findMovies(getLocalStorageItem('allMovies'), searchInputValue)
          setMoviesList(foundMovies)
          setLocalStorageItem(foundMovies, 'foundMovies')
          setShowAllMovies(true)
          setLocalStorageItem(true, 'showAllMovies')
          setLocalStorageItem(searchInputValue, 'inputValue')
        }).catch((err) => console.log(`Данные не загрузились. ${err}`))
        .finally(() => setIsLoading(false))
    }
    if (isShortMovies) {
      let shortMovies = sortMoviesByLength(allMovies);
      let foundMovies = findMovies(shortMovies, searchInputValue)
      setMoviesList(foundMovies)
      setFoMovies(foundMovies)
      setLocalStorageItem(foundMovies, 'foundMovies')
      setLocalStorageItem(foundMovies, 'shortMovies')
      setFoMovies(foundMovies)
      setLocalStorageItem(searchInputValue, 'inputValue')
    } else {
      let foundMovies = findMovies(allMovies, searchInputValue)
      setMoviesList(foundMovies)
      setFoMovies(foundMovies)
      setLocalStorageItem(foundMovies, 'foundMovies')
      setLocalStorageItem(searchInputValue, 'inputValue')
    }
  }

  function searchSavedMovies() {
    setSavedMovies(
      findMovies(savedMovies, searchInputValue)
    )
  }


  function toggleShortMovies() {
    if (savedMoviesPage) {
      setIsShortSavedMovies(!isShortSavedMovies);
      handleSavedMoviesCheckbox(!isShortSavedMovies);
    } else {
      setIsShortMovies(!isShortMovies);
      handleMoviesCheckbox(!isShortMovies);
    }
  }

  function handleMoviesCheckbox(checkbox) {
    setLocalStorageItem(checkbox, 'checkbox')
    console.log(checkbox);
    console.log(showAllMovies);
    if (showAllMovies) {
      if (checkbox) {
        let shortMovies = sortMoviesByLength(moviesList);
        setMoviesList(shortMovies)
        setLocalStorageItem(shortMovies, 'shortMovies')
      } else if (!checkbox && foMovies.length !== 0) {
        console.log('!check i fo');
        setMoviesList(foMovies);
        localStorage.removeItem('shortMovies')
      } else if (!checkbox && foMovies.length === 0) {
        console.log('!check i !fo');
        setMoviesList(allMovies)
        localStorage.removeItem('shortMovies')
      }
    }
    return;
  }

  function handleSavedMoviesCheckbox(checkbox) {
    console.log(checkbox);
    if (checkbox) {
      setSavedMovies(
        sortMoviesByLength(savedMovies)
      )
    } else if (searchInputValue !== '' && !checkbox) {
      setSavedMovies(
        findMovies(getLocalStorageItem('savedMovies'), searchInputValue)
      )
    } else if (!checkbox) {
      setSavedMovies(getLocalStorageItem('savedMovies'))
    }
  }


  function handleShowAllMovies() {
    setIsLoading(true);
    getAllMovies()
      .then((allMovies) => {
        setShowAllMovies(true);
        setLocalStorageItem(true, 'showAllMovies')
        setLocalStorageItem(allMovies, 'allMovies');
        setAllMovies(allMovies)
        setMoviesList(getLocalStorageItem('allMovies'))
      }).catch((err) => console.log(`Данные не загрузились. ${err}`))
      .finally(() => setIsLoading(false))
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
        setLoggedIn(true)
        navigate('/movies');
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
    navigate("/signin")
    setLoggedIn(false);
    setIsShortMovies(false);
    setSearchInputValue('');
    mainApi.setHeaderToken(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('showAllMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('checkbox');
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
                  location={location}
                />
              } />
              <Route path='/movies'
                element={
                  <ProtectedRoute
                    element={Movies}
                    loggedIn={loggedIn}
                    location={location}
                    movies={moviesList}
                    savedMovies={savedMovies}
                    selectShortMovies={toggleShortMovies}
                    showAllMovies={showAllMovies}
                    setFoMovies={setFoMovies}
                    isShortMovies={isShortMovies}
                    setIsShortMovies={setIsShortMovies}
                    searchMovies={searchMovies}


                    searchInputValue={searchInputValue}
                    setSearchInputValue={setSearchInputValue}
                    setMoviesList={setMoviesList}
                    handleShowAllMovies={handleShowAllMovies}

                    handleAddFavorites={handleAddFavorites}
                    handleRemoveFavorites={handleRemoveFavorites}
                  />}
              />
              <Route path='/saved-movies'
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    loggedIn={loggedIn}
                    location={location}
                    movies={savedMovies}
                    savedMovies={savedMovies}
                    isShortSavedMovies={isShortSavedMovies}
                    selectShortMovies={toggleShortMovies}
                    savedMoviesPage={savedMoviesPage}
                    searchSavedMovies={searchSavedMovies}
                    setSavedMovies={setSavedMovies}




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
                    location={location}
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
