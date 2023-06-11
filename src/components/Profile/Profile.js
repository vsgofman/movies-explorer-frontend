import { BlockPage } from '../BlockPage/BlockPage';
import './Profile.css';

function Profile({ loggedIn }) {
  return (
    <BlockPage loggedIn={loggedIn}>
      <section className='profile'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form
          className='profile__form'
          id='profile-form'
        >
          <div className='profile__input-block profile__input-block_name'>
            <p className='profile__text'>Имя</p>
            <input
              className='profile__input profile__input_name'
              id='profile-name'
              name='name'
              placeholder='Виталий'
            />
          </div>
          <div className='profile__input-block'>
            <p className='profile__text'>E-mail</p>
            <input
              className='profile__input profile__input_email'
              id='profile-email'
              type='email'
              name='email'
              placeholder='pochta@yandex.ru'
            />
          </div>
        </form>
        <div className='profile__button-block'>
          <button
            className='profile__button'
            form='profile-form'
            type='submit'
          >Редактировать
          </button>
          <button
            className='profile__button'
            type='button'
          >Выйти из аккаунта
          </button>
        </div>
      </section>
    </BlockPage>
  )
}

export default Profile;