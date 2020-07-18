export default class Card {
  constructor({cardSelectorsObj, cardItemObj, handleCardClick, handleCardDeleteClick, handleLikeSetClick}) {
    this._card = cardSelectorsObj.cardSelector;
    this._cardTitleClass = cardSelectorsObj.cardTitleClass;
    this._cardImgClass = cardSelectorsObj.cardImgClass;
    this._cardDeleteButtonClass = cardSelectorsObj.cardDeleteButtonClass;
    this._cardLikeButtonClass = cardSelectorsObj.cardLikeButtonClass;
    this._cardLikeActiveClass = cardSelectorsObj.cardLikeActiveClass;
    this._cardLikeCounterClass = cardSelectorsObj.cardLikeCounterClass;
    this._name = cardItemObj.name || cardItemObj.imgName;
    this._link = cardItemObj.link;
    this._id = cardItemObj._id;
    this._owner = cardItemObj.owner._id;
    this._likeCount = cardItemObj.likes.length;
    this._alt = cardItemObj.alt || 'Картинка.';
    this._handleCardClick = handleCardClick;
    this._handleLikeSetClick = handleLikeSetClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._userId = document.querySelector(`.${cardSelectorsObj.userIdSelector}`).id;
    this._ownerLike = cardItemObj.likes.some((e) => e._id === this._userId);

  }

  _getTemplate() {
    const cardTemplate = document.querySelector(`#${this._card}`).content;
    return cardTemplate.cloneNode(true);
  };

  _deleteEvent(event) {
    this._handleCardDeleteClick(this._id, this._card, event);
  };

  _likeEvent(event) {
    if (event.target.classList.contains(`${this._cardLikeActiveClass}`)) {
      this._handleLikeSetClick(this._id, true);
    } else {
      this._handleLikeSetClick(this._id, false);
    }
    event.target.classList.toggle(`${this._cardLikeActiveClass}`);
  };

  _setEvents() {
    this._like = this._element.querySelector(`.${this._cardLikeButtonClass}`);
    if (this._ownerLike) {
      this._like.classList.add(`${this._cardLikeActiveClass}`);
    }
    this._like.addEventListener('click', (event) => {
      this._likeEvent(event);
    });

    if (this._userId === this._owner) {
      this._delete = this._element.querySelector(`.${this._cardDeleteButtonClass}`);
      this._delete.classList.add('card__delete_active');
      this._delete.addEventListener('click', (event) => {
        this._deleteEvent(event);
      });
    }
    this._element.querySelector(`.${this._cardImgClass}`).addEventListener('click', this._handleCardClick);
  };

  _setAttributes() {
    const cardImg = this._element.querySelector(`.${this._cardImgClass}`);
    const cardTitle = this._element.querySelector(`.${this._cardTitleClass}`);
    this._cardLikeCounter = this._element.querySelector(`.${this._cardLikeCounterClass}`);
    cardImg.src = this._link;
    cardImg.alt = this._alt;
    cardImg.id = this._owner;
    cardTitle.textContent = this._name;
    this._cardLikeCounter.textContent = this._likeCount;
    cardImg.dataset.id = this._id;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setAttributes();
    this._setEvents();
    return this._element;
  }

  setLikes(obj) {
    this._cardLikeCounter.textContent = obj.likes.length;
  }
}