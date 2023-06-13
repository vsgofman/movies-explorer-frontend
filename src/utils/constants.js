export const URL_MOVIES = 'https://api.nomoreparties.co/beatfilm-movies';
export const URL_MAIN = 'https://vsgof.movies-api.nomoredomains.monster';
export const URL_LOCAL = '';
export const setLocalStorageItem = (value, name) => {
  localStorage.setItem(name, JSON.stringify(value));
}
export const getLocalStorageItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
}