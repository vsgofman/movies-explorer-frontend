import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import iconInput from '../../images/icon__input-search.png';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <img className='search__img' src={iconInput} alt='иконка поиска' />
        <input
          className='search__input'
          id='search-input'
          type='text'
          name='search'
          placeholder='Фильм'
        />
        <button
          className='search__button'
          aria-label='Поиск'
        />
        <div className='search__filter'>
          <FilterCheckbox />
          <p className='search__text'>Короткометражки</p>
        </div>
      </form>
    </section>

  )
}

export default SearchForm;