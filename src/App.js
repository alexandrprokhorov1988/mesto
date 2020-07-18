import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(0);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(0);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState(0);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(1);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(1);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(1);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(0);
    setAddPlacePopupOpen(0);
    setEditAvatarPopupOpen(0);
    setSelectedCard(0);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header/>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer/>
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        children={<>
          <label className="form__label">
            <input className="form__input" type="text" name="name" placeholder="Ваше имя" minLength="2" maxLength="40"
                   required pattern="^[а-яёА-ЯЁa-zA-Z-\s]+$" id="name-input"/>
            <span className="form__input-error" id="name-input-error"/>
          </label>
          <label className="form__label">
            <input className="form__input" type="text" name="about" placeholder="Ваша профессия" minLength="2"
                   maxLength="200" required id="profession-input" pattern="^[а-яёА-ЯЁa-zA-Z0-9-\s]+$"/>
            <span className="form__input-error" id="profession-input-error"/>
          </label>
          <input className="form__submit-button" type="submit" name="submit" value="Сохранить"/>
        </>}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm name="add" title="Новое место"
                     children={<>
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
                     </>}
                     isOpen={isAddPlacePopupOpen}
                     onClose={closeAllPopups}
      />
      <PopupWithForm name="confirm" title="Вы уверены?"
                     children={<>
                       <button className="form__submit-button form__submit-button_type_confirm" type="button">Да
                       </button>
                     </>}
                     onClose={closeAllPopups}
      />
      <PopupWithForm name="avatar" title="Обновить аватар"
                     children={<>
                       <label className="form__label">
                         <input className="form__input" type="url" name="avatarUrl" placeholder="Ссылка на аватар"
                                required
                                id="avatarUrl-input"/>
                         <span className="form__input-error" id="avatarUrl-input-error"/>
                       </label>
                       <input className="form__submit-button form__submit-button_inactive" type="submit" name="submit"
                              value="Сохранить"/>
                     </>}
                     isOpen={isEditAvatarPopupOpen}
                     onClose={closeAllPopups}
      />
      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
