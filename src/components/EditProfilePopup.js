import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(isOpen, onClose) {

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen}
                   onClose={onClose}>
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
    </PopupWithForm>
  );
}

export default EditProfilePopup;