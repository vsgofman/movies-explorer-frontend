import React from 'react';
import { URL_MAIN } from "./constants";

class MainApi extends React.Component {
  constructor(props) {
    super(props);
    this._url = this.props.url;
    this._headers = this.props.headers;
  }

  setHeaderToken(token) {
    this._headers = { ...this._headers, Authorization: `Bearer ${token}` };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(res => this._getResponseData(res))
  }

  editProfile(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email
      })
    }).then(res => this._getResponseData(res))
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
    }).then(res => this._getResponseData(res))
  }

  saveMovie(movie) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      id,
      nameRU,
      nameEN
    } = movie;
    return fetch(`${this._url}/movies`, {
      method: "POST",
        headers: this._headers,
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailer: trailerLink,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        movieId: id,
        nameRU: nameRU,
        nameEN: nameEN,
      })
    }).then(res => this._getResponseData(res));
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
        headers: this._headers
    }).then(res => this._getResponseData(res));
  }
}

const mainApi = new MainApi({
  url: URL_MAIN,
  headers: {
  'Content-Type': 'application/json'
  }
});

export default mainApi;
