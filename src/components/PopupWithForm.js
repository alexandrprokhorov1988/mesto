import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_form ${props.isOpen ? 'popup_opened' : ''}`} id={`${props.name}Popup`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button type="button" className="popup__close-icon" onClick={props.onClose}/>
        <h2 className="form__title">{props.title}</h2>
        <form action="#" className="form" id={`${props.name}Form`} data-form={props.name} method="get" noValidate>
          {props.children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;