import './SavedMovies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const {
    loggedIn,
    location,
    movies,
    savedMovies,

    
    onSelectShortFilms,
    searchInputValue,
    setSearchInputValue,
    searchMovies,
    selectShortMovies,
    handleAddFavorites,
    handleRemoveFavorites,
  } = props;

  return (
    <BlockPage loggedIn={loggedIn} location={location}>
      <section className='saved-movies'>
        <SearchForm
          selectShortMovies={selectShortMovies}
          onSelectShortFilms={onSelectShortFilms}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          searchMovies={searchMovies}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          handleAddFavorites={handleAddFavorites}
          handleRemoveFavorites={handleRemoveFavorites}
        />
      </section>
    </BlockPage >
  )
}

export default SavedMovies;