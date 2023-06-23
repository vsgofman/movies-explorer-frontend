import { URL_MOVIES } from './constants';

function getResponseData(res) {
  if (!res.ok) {
    Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
  }
  return res.json();
}

export function getAllMovies() {
  return fetch(URL_MOVIES)
    .then((res) => getResponseData(res))
}