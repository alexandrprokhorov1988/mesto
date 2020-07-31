import React from 'react';
import FormValidator from "../utils/validation";

function PopupWithForm({isOpen, name, title, onClose, children, onSubmit}) {

  const runValidation = () => {
    const forms = Array.from(document.querySelectorAll('.form'));
    forms.forEach((formElement) => {
      new FormValidator({
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__submit-button',
        inactiveButtonClass: 'form__submit-button_inactive',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_visible',
      }, formElement).enableValidation();
    });
  };
  runValidation();

  return (
    <div className={`popup popup_type_form ${isOpen ? 'popup_opened' : ''}`} id={`${name}Popup`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button type="button" className="popup__close-icon" onClick={onClose}/>
        <h2 className="form__title">{title}</h2>
        <form action="#" onSubmit={onSubmit} className="form" id={`${name}Form`} data-form={name} method="get" noValidate>
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;