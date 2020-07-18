import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  cardSelectorsObj,
  jobInput,
  nameInput,
  options,
  popupAddButton,
  popupAvatarEditButton,
  popupEditButton,
  popupImgObj,
  sectionElement,
  userAvatarSelector,
  userInfoSelector,
  userNameSelector,
  validation
} from '../utils/constants.js';

const api = new Api(options);

const popImg = new PopupWithImage(popupImgObj);

const userInfo = new UserInfo(userNameSelector, userInfoSelector, userAvatarSelector, jobInput, nameInput);

const editPopup = new PopupWithForm(
  {
    popupSelector: '#editPopup',
    formSelector: '#editForm',
    formInputSelector: '.form__input',
    submitFormFunction: (userObj) => {
      api.setUserInfo(userObj)
        .then(res => {
          userInfo.setUserInfo(res);
          editPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => editPopup.popupButtonLoadingText(false));
    }
  });

const addPopup = new PopupWithForm(
  {
    popupSelector: '#addPopup',
    formSelector: '#addForm',
    formInputSelector: '.form__input',
    submitFormFunction: (itemObj) => {
      api.setNewCard(itemObj)
        .then(result => {
          const item = new Section({
            itemsObj: result,
            rendererFunction: (cardItemObj) => {
              const card = new Card(
                {
                  cardSelectorsObj: cardSelectorsObj,
                  cardItemObj: cardItemObj,
                  handleCardClick: (e) => {
                    popImg.open(e);
                  },
                  handleCardDeleteClick: (id, card) => {
                    confirmPopup.setId(id);
                    confirmPopup.setCard(card);
                    confirmPopup.open();
                  },
                  handleLikeSetClick: (id, isLiked) => {
                    api.likeCard(id, isLiked)
                      .then(res => {
                        card.setLikes(res);
                      })
                      .catch(err => console.log(err));
                  },
                });
              const cardElement = card.generateCard();
              item.addItem(cardElement);
            }
          }, sectionElement);
          item.renderer();
          addPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => addPopup.popupButtonLoadingText(false));
    }
  });

const editAvatarPopup = new PopupWithForm(
  {
    popupSelector: '#editAvatarPopup',
    formSelector: '#editAvatarForm',
    formInputSelector: '.form__input',
    submitFormFunction: (itemObj) => {
      api.setUserAvatar(itemObj)
        .then(res => {
          userInfo.setUserInfo(res);
          editAvatarPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => editAvatarPopup.popupButtonLoadingText(false));
    }
  });

const confirmPopup = new PopupConfirm(
  {
    popupSelector: '#confirmPopup',
    buttonSelector: '.form__submit-button',
    confirmFunction: (id) => {
      api.deleteCard(id)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err))
    }
  });

const runValidation = ({formSelector}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    new FormValidator(validation, formElement).enableValidation();
  });
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, card]) => {
    userInfo.setUserInfo(user);
    card.reverse();
    const defaultCardList = new Section({
      itemsObj: card,
      rendererFunction: (cardItemObj) => {
        const card = new Card(
          {
            cardSelectorsObj: cardSelectorsObj,
            cardItemObj: cardItemObj,
            handleCardClick: (e) => {
              popImg.open(e);
            },
            handleCardDeleteClick: (id, card) => {
              confirmPopup.setId(id);
              confirmPopup.setCard(card);
              confirmPopup.open();
            },
            handleLikeSetClick: (id, isLiked) => {
              api.likeCard(id, isLiked)
                .then(res => {
                  card.setLikes(res);
                })
                .catch(err => console.log(err));
            },
          });
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
      }
    }, sectionElement);
    defaultCardList.renderer();
  })
  .catch((err) => console.log(err));

popupEditButton.addEventListener('click', () => {
  userInfo.setUserInfoToForm(userInfo.getUserInfo());
  editPopup.open();
});
popupAddButton.addEventListener('click', () => {
  addPopup.open();
});
popupAvatarEditButton.addEventListener('click', () => {
  editAvatarPopup.open();
});

runValidation(validation);