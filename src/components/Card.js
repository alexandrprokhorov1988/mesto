import React from 'react';

function Card({link, name, alt, _id, likes, onCardClick}) {

  function handleClick() {
    onCardClick({src: link, title: name, alt: alt});
  }

  return (
    <article className="card">
      <img className="card__img" src={link} alt={alt} id={_id} onClick={handleClick}/>
      <button type="button" className="card__delete"/>
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button type="button" className="card__like"/>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;