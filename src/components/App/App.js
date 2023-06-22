import './App.css';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useState, useEffect, useCallback } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Menu from '../Menu/Menu';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/constants';
import { modalMessages, SHORT_FILM_DURATION } from '../../utils/constants';
import mainApi from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';
import { register, authorize } from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') || false
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(
    localStorage.getItem('showAllMovies') || false
  );
  const [moviesList, setMoviesList] = useState([]);
  const [allMovies, setAllMovies] = useState(
    getLocalStorageItem('allMovies') || []);
  const [errorSearchMovie, setErrorSearchMovie] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [modalResponse, setModalResponse] = useState({ open: false, status: false });
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [inputsActive, setInputsActive] = useState(false);
  const { REGISTER_OK, SOMETHING_WENT_WRONG, PROFILE_EDIT_OK, EMAIL_ALREADY_EXIST } = modalMessages();
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
      }).catch((err) => console.log(`Некорректный токен. ${err}`))
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getProfile()
        .then((user) => {
          setCurrentUser(user);
        }).catch((err) => console.log(err))
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi.getSavedMovies()
        .then(savedMovies => {
          setSavedMovies(savedMovies)
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
    if (shortMovies !== null) {
      setMoviesList(shortMovies);
      setIsShortMovies(checkbox);
      setSearchInputValue(inputValue);
      return;
    } else {
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
      return movie.duration < SHORT_FILM_DURATION;
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
          setAllMovies(allMovies);
          let foundMovies = findMovies(getLocalStorageItem('allMovies'), searchInputValue);
          setLocalStorageItem(foundMovies, 'foundMovies');
          setLocalStorageItem(true, 'showAllMovies');
          setShowAllMovies(true);
          setLocalStorageItem(searchInputValue, 'inputValue');
          if (!isShortMovies) {
            return setMoviesList(foundMovies);
          } else {
            let shortMovies = sortMoviesByLength(foundMovies);
            setLocalStorageItem(shortMovies, 'shortMovies');
            setMoviesList(shortMovies);
          }
        }).catch((err) => console.log(`Данные не загрузились. ${err}`))
        .finally(() => setIsLoading(false))
    }
    if (isShortMovies) {
      let foundMovies = findMovies(allMovies, searchInputValue)
      let shortMovies = sortMoviesByLength(foundMovies);
      setMoviesList(shortMovies)
      setLocalStorageItem(foundMovies, 'foundMovies')
      setLocalStorageItem(shortMovies, 'shortMovies')
      setLocalStorageItem(searchInputValue, 'inputValue')
    } else {
      let foundMovies = findMovies(allMovies, searchInputValue)
      setMoviesList(foundMovies)
      setLocalStorageItem(foundMovies, 'foundMovies')
      setLocalStorageItem(searchInputValue, 'inputValue')
    }
  }

  function searchSavedMovies() {
    setIsShortSavedMovies(false)
    setSavedMovies(
      findMovies(getLocalStorageItem('savedMovies'), searchInputValue)
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
    if (showAllMovies) {
      if (checkbox) {
        let shortMovies = sortMoviesByLength(moviesList);
        setMoviesList(shortMovies)
        setLocalStorageItem(shortMovies, 'shortMovies')
      } else if (!checkbox && getLocalStorageItem('foundMovies')) {
        setMoviesList(getLocalStorageItem('foundMovies'));
        localStorage.removeItem('shortMovies')
      } else if (!checkbox && getLocalStorageItem('foundMovies') === null) {
        setMoviesList(allMovies)
        localStorage.removeItem('shortMovies')
      }
    }
    return;
  }

  function handleSavedMoviesCheckbox(checkbox) {
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
        setMoviesList(allMovies)
        setIsShortMovies(false)
      }).catch((err) => console.log(`Данные не загрузились. ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleRegister({ name, email, password }) {
    register(name, email, password)
      .then((res) => {
        setModalResponse({ open: true, status: true, message: REGISTER_OK });
        handleLogin({
          email: email,
          password: password,
        })
        navigate('/movies');
      }).catch(() => setModalResponse({ open: true, status: false, message: SOMETHING_WENT_WRONG }))
  }

  function handleLogin({ email, password }) {
    authorize(email, password)
      .then(res => {
        localStorage.setItem("jwt", res.token)
        mainApi.setHeaderToken(res.token)
      }).then((res) => {
        setLoggedIn(true);
        navigate('/movies');
      }).catch(err => console.log(`Не удаётся войти. ${err}`))
  }

  function handleUpdateUser({ name, email }) {
    mainApi.editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setModalResponse({ open: true, status: true, message: PROFILE_EDIT_OK });
        setInputsActive(false);
      }).catch((err) => {
        if (err.includes('409')) {
          setModalResponse({ open: true, status: false, message: EMAIL_ALREADY_EXIST })
          return;
        }
        setModalResponse({ open: true, status: false, message: SOMETHING_WENT_WRONG })
      });
  }

  function handleNavButtonClick() { setIsNavigationOpen(true) };

  function closeModal() {
    setIsNavigationOpen(false);
    setModalResponse({ open: false, status: modalResponse.status });
  }

  function signOut() {
    navigate('/')
    setLoggedIn(false);
    setIsShortMovies(false);
    setSearchInputValue('');
    setShowAllMovies(false);
    setAllMovies([]);
    setMoviesList([]);
    setCurrentUser({});
    mainApi.setHeaderToken(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('foundMovies');
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
      .then(() => {
        setSavedMovies((state) => state.filter((stateItem) => stateItem._id !== movie._id))
      })
      .catch((err) => console.log(`Не удалось удалить фильм. ${err}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='page'>
          <Routes>
            <Route path='/' element={
              <Main
                loggedIn={loggedIn}
                location={location}
                handleNavClick={handleNavButtonClick}
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
                  isShortMovies={isShortMovies}
                  setIsShortMovies={setIsShortMovies}
                  searchMovies={searchMovies}
                  errorSearchMovie={errorSearchMovie}
                  setErrorSearchMovie={setErrorSearchMovie}
                  setIsShortSavedMovies={setIsShortSavedMovies}
                  isLoading={isLoading}
                  handleNavClick={handleNavButtonClick}
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
                  setIsShortSavedMovies={setIsShortSavedMovies}
                  selectShortMovies={toggleShortMovies}
                  savedMoviesPage={savedMoviesPage}
                  searchSavedMovies={searchSavedMovies}
                  setSavedMovies={setSavedMovies}
                  errorSearchMovie={errorSearchMovie}
                  setErrorSearchMovie={setErrorSearchMovie}
                  isLoading={isLoading}
                  handleNavClick={handleNavButtonClick}
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
                  handleNavClick={handleNavButtonClick}
                  inputsActive={inputsActive}
                  setInputsActive={setInputsActive}
                />}
            />
            <Route path='/signin'
              element={loggedIn ? <Navigate to="/" /> : <Login
                onFormSubmit={handleLogin}
              />}
            />
            <Route path='/signup'
              element={loggedIn ? <Navigate to="/" /> : <Register
                onFormSubmit={handleRegister}
              />}
            />
            <Route
              path="*"
              element={<PageNotFound
                loggedIn={loggedIn}
              />}
            />
          </Routes>
          <InfoToolTip
            modalResponse={modalResponse}
            onClose={closeModal}
          />
          <Menu
            isOpen={isNavigationOpen}
            onClose={closeModal}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
