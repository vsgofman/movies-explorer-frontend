export const URL_MOVIES = 'https://api.nomoreparties.co/beatfilm-movies';
export const URL_MAIN = 'https://vsgof.movies-api.nomoredomains.monster';
export const URL_LOCAL = '';
export const SHORT_FILM_DURATION = 40;

export const quantityCards = () => {
  const QUANTITY_CARDS_L = 12;
  const QUANTITY_CARDS_M = 8;
  const QUANTITY_CARDS_S = 5;

  return { QUANTITY_CARDS_S, QUANTITY_CARDS_M, QUANTITY_CARDS_L }
}

export const quantityCardsAdd = () => {
  const QUANTITY_CARDS_ADD_M = 3;
  const QUANTITY_CARDS_ADD_S = 2;

  return { QUANTITY_CARDS_ADD_S, QUANTITY_CARDS_ADD_M }
}

export const widthScreen = () => {
  const WIDTH_SCREEN_M = 917;
  const WIDTH_SCREEN_S = 651;

  return { WIDTH_SCREEN_S, WIDTH_SCREEN_M }
}

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

