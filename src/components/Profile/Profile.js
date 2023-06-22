import { BlockPage } from '../BlockPage/BlockPage';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from "react";
import { useFormHandler } from '../../utils/useFormHandler';
import { REGEX_EMAIL, ERR_MESSAGE_EMAIL } from '../../utils/constants';

function Profile({ loggedIn, location, signOut, onUpdateUser, handleNavClick, inputsActive, setInputsActive }) {
  const { handleChange, inputValues, inputErrors, setInputValues, setInputErrors } = useFormHandler();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setInputValues({
      ...inputValues,
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: inputValues.name,
      email: inputValues.email,
    });
  }

  function handleStartEdit() {
    setInputsActive(true);
  }

  function handleCancelEdit() {
    setInputsActive(false);
    setInputValues({
      ...inputValues,
      name: currentUser.name,
      email: currentUser.email,
    })
    setInputErrors({
      ...inputErrors,
      name: '',
      email: ''
    })
  }

  const buttonInactive =
  inputErrors.email || inputErrors.name ||
  (currentUser.email === inputValues.email && currentUser.name === inputValues.name);

  return (
    <BlockPage loggedIn={loggedIn} location={location} handleNavClick={handleNavClick}>
      <section className='profile'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form
          className='profile__form'
          id='profile-form'
        >
          <div className='profile__input-block profile__input-block_name'>
            <p className='profile__text'>Имя</p>
            <input
              readOnly={!inputsActive}
              className='profile__input profile__input_name'
              id='profile-name'
              name='name'
              placeholder='Виталий'
              onChange={handleChange}
              value={inputValues.name || ''}
              minLength='2'
              required
            />
            <span className='profile__input-block_error'>
              {inputErrors.name}
            </span>
          </div>
          <div className='profile__input-block'>
            <p className='profile__text'>E-mail</p>
            <input
              readOnly={!inputsActive}
              className='profile__input profile__input_email'
              id='profile-email'
              type='email' name='email'
              placeholder='pochta@yandex.ru'
              onChange={handleChange}
              value={inputValues.email || ''}
              pattern={REGEX_EMAIL}
              required
            />
            <span className='profile__input-block_error'>
              {inputErrors?.email && ERR_MESSAGE_EMAIL}
            </span>
          </div>
        </form>
        <div className='profile__button-block'>
          <button
            className={`profile__button ${!inputsActive && 'profile__button_active'}`}
            type='button'
            onClick={handleStartEdit}
          >Редактировать
          </button>
          <button
            className={`profile__button ${!inputsActive && 'profile__button_active'}`}
            type='button'
            onClick={signOut}
          >Выйти из аккаунта
          </button>
          <button
            className={`profile__button ${inputsActive && 'profile__button_active'} ${buttonInactive && "profile__button_disabled"}`}
            form='profile-form'
            type='submit'
            disabled={buttonInactive}
            onClick={handleSubmit}
          >Сохранить
          </button>
          <button
            className={`profile__button ${inputsActive && 'profile__button_active'}`}
            type='button'
            onClick={handleCancelEdit}
          >Отмена
          </button>
        </div>
      </section>
    </BlockPage>
  )
}

export default Profile;