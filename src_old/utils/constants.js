export const validation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};
export const cardSelectorsObj = {
  cardSelector: 'card',
  cardTitleClass: 'card__title',
  cardImgClass: 'card__img',
  cardDeleteButtonClass: 'card__delete',
  cardLikeButtonClass: 'card__like',
  cardLikeActiveClass: 'card__like_active',
  cardLikeCounterClass: 'card__like-counter',
  userIdSelector: 'profile__user-name'
};

export const popupImgObj = {
  cardClass: 'card',
  cardTitleClass: 'card__title',
  cardImgClass: 'card__img',
  popupSelector: '#imgPopup',
  popupImg: 'popup__image',
  popupTitle: 'popup__image-title'
};

export const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'fb1a9012-192e-4e17-8940-fb9d45f05cd7',
    'Content-Type': 'application/json'
  }
};

export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupAddButton = document.querySelector('.profile__add-button');
export const popupAvatarEditButton = document.querySelector('.profile__avatar-edit-button');
export const nameInput = document.querySelector('[name=name]');
export const jobInput = document.querySelector('[name=about]');
export const userAvatarSelector = document.querySelector('.profile__avatar');
export const userNameSelector = document.querySelector('.profile__user-name');
export const userInfoSelector = document.querySelector('.profile__user-profession');
export const sectionElement = '.elements';