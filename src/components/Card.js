import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick({src: props.link, title: props.name, alt: props.alt});
  }

  return (
    <article className="card">
      <img className="card__img" src={props.link} alt={props.alt} id={props._id} onClick={handleClick}/>
      <button type="button" className="card__delete"/>
      <div className="card__info">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like-container">
          <button type="button" className="card__like"/>
          <p className="card__like-counter">{props.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;