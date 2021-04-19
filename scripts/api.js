class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  //GET https://around.nomoreparties.co/v1/group-7/cards
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // GET https://around.nomoreparties.co/v1/group-7/users/me
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // PATCH https://around.nomoreparties.co/v1/group-7/users/me
  editUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // POST https://around.nomoreparties.co/v1/group-7/cards
  postNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // DELETE https://around.nomoreparties.co/v1/group-7/cards/cardId
  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // PUT https://around.nomoreparties.co/v1/group-7/cards/likes/cardId
  addCardLike(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // DELETE https://around.nomoreparties.co/v1/group-7/cards/likes/cardId
  removeCardLike(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    })
  }

  // PATCH https://around.nomoreparties.co/v1/group-7/users/me/avatar
  editUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    })
  }
}

export default Api
