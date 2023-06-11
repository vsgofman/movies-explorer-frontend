import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [shortMoviesOnly, setShortMoviesOnly] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getAllMovies()
      .then((moviesData) => {
        setMoviesList(moviesData);
        setAllMovies(moviesData);
      }).catch((err) => console.log(`Данные не загрузились. ${err}`))
      .finally(() => setIsLoading(false))
  }, [])

  function filterMovies() {
    let foundMovies = allMovies.filter((movie) => (
      movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())
    ))
    let shortFoundMovies = foundMovies.filter(movie => movie.duration <= 40);
    if (shortMoviesOnly === true) {
      foundMovies = shortFoundMovies;
    }
    localStorage.setItem('searchInputValue', JSON.stringify(searchInputValue));
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    setMoviesList(foundMovies);
    return foundMovies;
  }

  function selectShortMovies() {
    setShortMoviesOnly(!shortMoviesOnly);
    if (!shortMoviesOnly) {
      const shortMovies = moviesList.filter(movie => movie.duration <= 40);
      localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
      setShortMovies(shortMovies);
      return setMoviesList(shortMovies);
    }
    if (shortMoviesOnly && localStorage.getItem('foundMovies')) {
      return setMoviesList(JSON.parse(localStorage.getItem('foundMovies')));
    }
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
                    selectShortMovies={selectShortMovies}
                    searchInputValue={searchInputValue}
                    setSearchInputValue={setSearchInputValue}
                    filterMovies={filterMovies}
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
