import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import logo from '../../images/logo.svg';

function SearchForm() {
  return (
    <form className='search'>
      <FilterCheckbox />
    </form>
  )
}

export default SearchForm;