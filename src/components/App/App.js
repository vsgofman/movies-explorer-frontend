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
  const [shortMoviesOnly, setShortMoviesOnly] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
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
      }).then(() => {
        if (allMovies.length === 0) {
          setAllMovies(getLocalStorageItem('allMovies'))
        }
      }).catch((err) => console.log(`Некорректный токен. ${err}`))
  }, [navigate])

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if ((allMovies === null || allMovies.length === 0) && getLocalStorageItem('allMovies')) {
      console.log('аминь');
    }
  }, [])

  // useEffect(() => {
  //   if (!getLocalStorageItem('allMovies') && loggedIn) {
  //     setIsLoading(true);
  //     getAllMovies()
  //       .then((allMovies) => {
  //         setAllMovies(allMovies)
  //         setLocalStorageItem(allMovies, 'allMovies');
  //       }).catch((err) => console.log(`Данные не загрузились. ${err}`))
  //       .finally(() => setIsLoading(false))
  //   }
  // }, [loggedIn])

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

  // useEffect(() => {
  //   let checkbox = getLocalStorageItem('checkbox');
  //   let foundMovies = getLocalStorageItem('foundMovies');
  //   let shortMovies = getLocalStorageItem('shortMovies');
  //   if (foundMovies) {
  //     setShortMoviesOnly(checkbox)
  //     setSearchInputValue(getLocalStorageItem('inputValue'))
  //     if (checkbox === true) {
  //       setMoviesList(shortMovies);
  //       setShortMoviesOnly(checkbox);
  //       return;
  //     } else if (checkbox === false) {
  //       setMoviesList(foundMovies);
  //       return;
  //     } else if (shortMovies.length !== 0) {
  //       // выводим ничего не найдено
  //       console.log('ничего не найдено');
  //     }
  //   }
  //   if (getLocalStorageItem('allMovies') !== null) {
  //     if (checkbox === true) {
  //       setShortMoviesOnly(checkbox);
  //       setMoviesList(shortMovies);
  //       return;
  //     } else if (checkbox === false) {
  //       setMoviesList(getLocalStorageItem('allMovies'));
  //       return;
  //     }
  //   }
  //   setMoviesList([]);
  // }, [])



  // function handleCheckbox(checkbox) {
  //   let shortMovies
  //   if (getLocalStorageItem('foundMovies')) {
  //     if (checkbox === true) {
  //       shortMovies = (getLocalStorageItem('foundMovies')).filter((movie) => movie.duration <= 40);
  //     } else {
  //       setMoviesList(getLocalStorageItem('foundMovies'));
  //       return;
  //     }
  //   } else if (!getLocalStorageItem('foundMovies') && getLocalStorageItem('showAllMovies') === true) {
  //     if (checkbox === true) {
  //       shortMovies = (getLocalStorageItem('allMovies')).filter((movie) => movie.duration <= 40);
  //     } else {
  //       setMoviesList(getLocalStorageItem('allMovies'))
  //       localStorage.removeItem('shortMovies')
  //       return;
  //     }
  //   } else if (!getLocalStorageItem('foundMovies') && getLocalStorageItem('showAllMovies') !== true) {
  //     setMoviesList([])
  //     return;
  //   }
  //   setMoviesList(shortMovies)
  //   setLocalStorageItem(shortMovies, 'shortMovies')
  //   return;
  // }

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

        }).catch((err) => console.log(`Данные не загрузились. ${err}`))
        .finally(() => setIsLoading(false))
    }
    if (shortMoviesOnly) {
      console.log(allMovies)
      let shortMovies = sortMoviesByLength(allMovies);
      let foundMovies = findMovies(shortMovies, searchInputValue)
      setMoviesList(foundMovies)
      setFoMovies(foundMovies)
      // setLocalStorageItem(foundMovies, 'foundMovies');
      setLocalStorageItem(foundMovies, 'foundMovies')
    } else {
      let foundMovies = findMovies(allMovies, searchInputValue)
      setMoviesList(foundMovies)
      setFoMovies(foundMovies)
      // setLocalStorageItem(foundMovies, 'foundMovies');
      setLocalStorageItem(foundMovies, 'foundMovies')
    }
    // let foundMovies = getLocalStorageItem('allMovies').filter((movie) => (
    //   movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())
    // ))
    // setLocalStorageItem(foundMovies, 'foundMovies');
    // setLocalStorageItem(searchInputValue, 'inputValue')
    // setLocalStorageItem(true, 'showAllMovies');
    // setShowAllMovies(true)
    // setShortMoviesOnly(false)
    // setLocalStorageItem(false, 'checkbox');
    // setMoviesList(foundMovies)
  }

  console.log('бзынь');


  function toggleShortMovies() {
    console.log('toggle работает');
    setShortMoviesOnly(!shortMoviesOnly);
    handleCheckbox(!shortMoviesOnly)
  }

  // useEffect(() => {
  //   setLocalStorageItem(shortMoviesOnly, 'checkbox')

  //   if (shortMoviesOnly) {
  //     setSavedMovies(sortMoviesByLength(savedMovies));
  //     let shortMovies = sortMoviesByLength(moviesList)
  //     setMoviesList(shortMovies);
  //     setLocalStorageItem(shortMovies, 'shortMovies')
  //   } else {
  //     setSavedMovies(getLocalStorageItem('savedMovies'))
  //     if (getLocalStorageItem('foundMovies')) {
  //       return setMoviesList(getLocalStorageItem('foundMovies'));
  //     }
  //     setMoviesList(allMovies);
  //   }
  // }, [shortMoviesOnly]);

  function handleCheckbox(checkbox) {
    setLocalStorageItem(checkbox, 'checkbox')
    console.log(checkbox);
    console.log(showAllMovies);
    console.log(foMovies);
    if (showAllMovies) {
      if (checkbox) {
        setMoviesList(
          sortMoviesByLength(moviesList)
        )
      } else if (!checkbox && foMovies.length !== 0) {
        console.log(foMovies);
        console.log('!check i fo');
        setMoviesList(foMovies)
      } else if (!checkbox && foMovies.length === 0) {
        console.log('!check i !fo');
        setMoviesList(allMovies)
      }
    }
    return;
  }


  function handleShowAllMovies() {
    setIsLoading(true);
    getAllMovies()
      .then((allMovies) => {
        setShowAllMovies(true);
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
    setShowAllMovies(false);
    setShortMoviesOnly(false);
    mainApi.setHeaderToken(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('allMovies');
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
                    shortMoviesOnly={shortMoviesOnly}
                    selectShortMovies={toggleShortMovies}
                    showAllMovies={showAllMovies}
                    setFoMovies={setFoMovies}





                    setShortMoviesOnly={setShortMoviesOnly}
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
                    shortMoviesOnly={shortMoviesOnly}
                    selectShortMovies={toggleShortMovies}





                    setShortMoviesOnly={setShortMoviesOnly}
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
