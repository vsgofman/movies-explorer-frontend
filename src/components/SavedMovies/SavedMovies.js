import './SavedMovies.css';
import { BlockPage } from '../BlockPage/BlockPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const {
    movies,
    onSelectShortFilms,
    loggedIn,
    searchInputValue,
    setSearchInputValue,
    searchMovies,
    selectShortMovies,
    handleAddFavorites,
    handleRemoveFavorites,
  } = props;

  return (
    <BlockPage loggedIn={loggedIn}>
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
          handleAddFavorites={handleAddFavorites}
          handleRemoveFavorites={handleRemoveFavorites}
        />
      </section>
    </BlockPage >
  )
}

export default SavedMovies;