import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <section className='not-found'>
      <div className='not-found__block'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__subtitle'>Страница не найдена</p>
      </div>
      <Link className='not-found__return' to='/'>Назад</Link>
    </section>
  )
}

export default PageNotFound;