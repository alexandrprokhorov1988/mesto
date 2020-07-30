import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo({name, about})
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}/>

        {/*<PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen}*/}
        {/*onClose={closeAllPopups}>*/}
        {/*<label className="form__label">*/}
        {/*<input className="form__input" type="text" name="name" placeholder="Ваше имя" minLength="2" maxLength="40"*/}
        {/*required pattern="^[а-яёА-ЯЁa-zA-Z-\s]+$" id="name-input"/>*/}
        {/*<span className="form__input-error" id="name-input-error"/>*/}
        {/*</label>*/}
        {/*<label className="form__label">*/}
        {/*<input className="form__input" type="text" name="about" placeholder="Ваша профессия" minLength="2"*/}
        {/*maxLength="200" required id="profession-input" pattern="^[а-яёА-ЯЁa-zA-Z0-9-\s]+$"/>*/}
        {/*<span className="form__input-error" id="profession-input-error"/>*/}
        {/*</label>*/}
        {/*<input className="form__submit-button" type="submit" name="submit" value="Сохранить"/>*/}
        {/*</PopupWithForm>*/}

        <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <label className="form__label">
            <input className="form__input" type="text" name="name" placeholder="Название" minLength="1"
                   maxLength="30"
                   required id="imgName-input" pattern="^[а-яёА-ЯЁa-zA-Z0-9-\s]+$"/>
            <span className="form__input-error" id="imgName-input-error"/>
          </label>
          <label className="form__label">
            <input className="form__input" type="url" name="link" placeholder="Ссылка на картинку" required
                   id="link-input"/>
            <span className="form__input-error" id="link-input-error"/>
          </label>
          <input className="form__submit-button form__submit-button_inactive" type="submit" name="submit"
                 value="Создать"/>
        </PopupWithForm>
        <PopupWithForm name="confirm" title="Вы уверены?" onClose={closeAllPopups}>
          <button className="form__submit-button form__submit-button_type_confirm" type="button">Да</button>
        </PopupWithForm>
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <label className="form__label">
            <input className="form__input" type="url" name="avatarUrl" placeholder="Ссылка на аватар"
                   required
                   id="avatarUrl-input"/>
            <span className="form__input-error" id="avatarUrl-input-error"/>
          </label>
          <input className="form__submit-button form__submit-button_inactive" type="submit" name="submit"
                 value="Сохранить"/>
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
