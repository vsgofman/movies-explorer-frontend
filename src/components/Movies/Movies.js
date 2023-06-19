import './Movies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  const {
    loggedIn,
    location,
    movies,
    savedMovies,
    showAllMovies,
    setFoMovies,
    isShortMovies,
    setIsShortMovies,
    searchMovies,

    
    setMoviesList,
    selectShortMovies,
    handleShowAllMovies,
    searchInputValue,
    setSearchInputValue,
    handleAddFavorites,
    handleRemoveFavorites,
  } = props;

  return (
    <BlockPage loggedIn={loggedIn} location={location}>
      <section className='movies'>
        <SearchForm
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          searchMovies={searchMovies}

          selectShortMovies={selectShortMovies}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          setMoviesList={setMoviesList}
          showAllMovies={showAllMovies}
          setFoMovies={setFoMovies}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          showAllMovies={showAllMovies}

          
          handleShowAllMovies={handleShowAllMovies}
          handleAddFavorites={handleAddFavorites}
          handleRemoveFavorites={handleRemoveFavorites}
        />
      </section>
    </BlockPage>
  )
}

export default Movies;