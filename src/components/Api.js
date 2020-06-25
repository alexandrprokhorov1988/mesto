export default class Api {
  constructor(options) {
    this._autorization = options.headers.authorization;
    this._baseUrl = options.baseUrl;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._autorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._autorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  setUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._autorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  setNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._autorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._autorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: cardId
      })
    })
      .then(res => {
        if (res.ok) {
          console.log(`Карточка с id: ${cardId} удалена`);
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  likeeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._autorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: cardId
      })
    })
      .then(res => {
        if (res.ok) {
          console.log(`Карточка сid: ${cardId} лайкнута`);
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}