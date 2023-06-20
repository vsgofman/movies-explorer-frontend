export const URL_MOVIES = 'https://api.nomoreparties.co/beatfilm-movies';
export const URL_MAIN = 'https://vsgof.movies-api.nomoredomains.monster';
export const URL_LOCAL = '';
export const modalMessages = () => {
  const REGISTER_OK = 'Вы успешно зарегистрировались!';
  const PROFILE_EDIT_OK = 'Данные профиля успешно обновлены!';
  const SOMETHING_WENT_WRONG = 'Что-то пошло не так! Попробуйте ещё раз.';

  return { REGISTER_OK, SOMETHING_WENT_WRONG, PROFILE_EDIT_OK }
}

export const setLocalStorageItem = (value, name) => {
  localStorage.setItem(name, JSON.stringify(value));
}
export const getLocalStorageItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
}

