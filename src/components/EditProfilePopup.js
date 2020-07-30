import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm name="edit"
                   title="Редактировать профиль"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}>
      <label className="form__label">
        <input className="form__input"
               type="text"
               name="name"
               placeholder="Ваше имя"
               minLength="2"
               maxLength="40"
               required pattern="^[а-яёА-ЯЁa-zA-Z-\s]+$"
               id="name-input"
               value={name}
               onChange={handleChangeName}/>
        <span className="form__input-error"
              id="name-input-error"/>
      </label>
      <label className="form__label">
        <input className="form__input"
               type="text"
               name="about"
               placeholder="Ваша профессия"
               minLength="2"
               maxLength="200"
               required id="profession-input"
               pattern="^[а-яёА-ЯЁa-zA-Z0-9-\s]+$"
               value={description}
               onChange={handleChangeDescription}/>
        <span className="form__input-error"
              id="profession-input-error"/>
      </label>
      <input className="form__submit-button"
             type="submit"
             name="submit"
             value="Сохранить"/>
    </PopupWithForm>
  );
}

export default EditProfilePopup;