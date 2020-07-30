import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {


  return (
    <PopupWithForm name="add"
                   title="Новое место"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={onAddPlace}>
      <label className="form__label">
        <input className="form__input" type="text" name="name" placeholder="Название" minLength="1"
               maxLength="30"
               required id="imgName-input" pattern="^[а-яёА-ЯЁa-zA-Z0-9-\s]+$"/>
        <span className="form__input-error"
              id="imgName-input-error"/>
      </label>
      <label className="form__label">
        <input className="form__input" type="url" name="link" placeholder="Ссылка на картинку" required
               id="link-input"/>
        <span className="form__input-error"
              id="link-input-error"/>
      </label>
      <input className="form__submit-button form__submit-button_inactive"
             type="submit" name="submit"
             value="Создать"/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;