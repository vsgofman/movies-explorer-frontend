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
  const [shortMoviesOnly, setShortMoviesOnly] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(true);
  const [searchInputValue, setSearchInputValue] = useState('');
  // const [allMovies, setAllMovies] = useState([]);
  // const [shortMovies, setShortMovies] = useState([]);
  // const [moviesList, setMoviesList] = useState([]);
  

  // // монтирование movies
  // useEffect(() => {
  //   if(отфильтрованные карточки !== null) {
  //     получить состояние чекбокса
  //     получить состояние поисковой строки
  //     получить отфильтрованные карточки
  //     записать чекбокс и значение поиска в стейты
  //     рендер карточек
  //   }
  //   if(нажата кнопка все фильмы === true && чекбокс !== true) {
  //     получить все карточки из локала
  //     return рендер карточек
  //   }
  //   if(нажата кнопка все фильмы === true && чекбокс === true) {
  //     получить карточки из локала
  //     отфильтровать карточки
  //     рендер карточек
  //     сохранить отфильтрованные в localStorage
  //   }
  //   загрузить состояние чекбокса из локала
  //   записать его в стейт
  //   отобразить "начните поиск"
  //   отобразить кнопку "все фильмы"
  // }, [])

    // function поискФильмов() {
  //   показать прелоадер
  //   запрос к API
  //   сохранить все карточки в localStorage
  //   сортировка чекбоксом()
  //   сортировка по строке()
  //   рендер карточек
  //   сохранить отфильтрованные карточки
  //   сохранить состояние чекбокса
  //   сохранить поисковой запрос
  //   убрать прелоадер
  // }

  // // сортировка чекбоксом
  // function выбратьКороткиеФильмы(фильмы) {
  //   return let короткиеФильмы = фильмы.filter(movie => movie.duration <= 40);
  // } 
  
  // // сортировка по строке
  // function поискоПоСтроке(фильмы) {
  //   return let сортированныеФильмы = фильмы.filter((movie) => (
  //     movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())
  //   )
  // }

  // useEffect(() => {
  //   setIsLoading(true);
  //   getAllMovies()
  //     .then((moviesData) => {
  //       localStorage.setItem('moviesList', JSON.stringify(moviesData));
  //       setMoviesList(moviesData);
  //       setAllMovies(moviesData);
  //     }).catch((err) => console.log(`Данные не загрузились. ${err}`))
  //     .finally(() => setIsLoading(false))
  // }, [])

  // function filterMovies() {
  //   let foundMovies = allMovies.filter((movie) => (
  //     movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())
  //   ))
  //   let shortFoundMovies = foundMovies.filter(movie => movie.duration <= 40);
  //   if (shortMoviesOnly === true) {
  //     foundMovies = shortFoundMovies;
  //   }
  //   localStorage.setItem('searchInputValue', JSON.stringify(searchInputValue));
  //   localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
  //   setMoviesList(foundMovies);
  //   return foundMovies;
  // }

  // function selectShortMovies() {
  //   setShortMoviesOnly(!shortMoviesOnly);
  //   if (!shortMoviesOnly) {
  //     const shortMovies = moviesList.filter(movie => movie.duration <= 40);
  //     localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
  //     setShortMovies(shortMovies);
  //     return setMoviesList(shortMovies);
  //   }
  //   if (shortMoviesOnly && localStorage.getItem('foundMovies')) {
  //     return setMoviesList(JSON.parse(localStorage.getItem('foundMovies')));
  //   }
  //   if (shortMoviesOnly && localStorage.getItem('shortMovies')) {
  //     return setMoviesList(allMovies);
  //   }
  // }

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
                    setMoviesList={setMoviesList}
                    setShowAllMovies={setShowAllMovies}
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
