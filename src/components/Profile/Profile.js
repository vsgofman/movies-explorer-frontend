import { BlockPage } from '../BlockPage/BlockPage';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from "react";

function Profile({ loggedIn, location, signOut, onUpdateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      email,
    });
  }

  return (
    <BlockPage loggedIn={loggedIn} location={location}>
      <section className='profile'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
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
              onChange={handleNameChange}
              value={name || ''}
            />
          </div>
          <div className='profile__input-block'>
            <p className='profile__text'>E-mail</p>
            <input
              className='profile__input profile__input_email'
              id='profile-email'
              type='email' name='email'
              placeholder='pochta@yandex.ru'
              onChange={handleEmailChange}
              value={email || ''}
            />
          </div>
        </form>
        <div className='profile__button-block'>
          <button
            className='profile__button'
            form='profile-form'
            type='submit'
            onClick={handleSubmit}
          >Редактировать
          </button>
          <button
            className='profile__button'
            type='button'
            onClick={signOut}
          >Выйти из аккаунта
          </button>
        </div>
      </section>
    </BlockPage>
  )
}

export default Profile;