import React from 'react';

function ImagePopup(props) {

  return (
    <div className={`popup popup_type_img ${props.card.src ? 'popup_opened' : ''}`} id="imgPopup">
      <div className="popup__container popup__container_type_img">
        <img className="popup__image" src={props.card.src} alt={props.card.alt}/>
        <h2 className="popup__image-title">{props.card.title}</h2>
        <button type="button" className="popup__close-icon" onClick={props.onClose}/>
      </div>
    </div>
  )
}

export default ImagePopup;