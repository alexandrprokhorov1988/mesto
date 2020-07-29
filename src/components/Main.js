import React from 'react';
import avatarBg from '../images/avatar-bg.png';
import api from "../utils/api";
import Card from "../components/Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onCardClick, onAddPlace, onEditProfile}) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api.getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar ? currentUser.avatar : avatarBg} alt="Аватар." className="profile__avatar"/>
          <div className="profile__bg">
            <button type="button" className="profile__avatar-edit-button" data-button="editAvatar"
                    onClick={onEditAvatar}/>
          </div>
        </div>
        <div className="profile__user-info">
          <div className="profile__row">
            <h1 className="profile__user-name"
                id={currentUser._id ? currentUser._id : ''}>{currentUser.name ? currentUser.name : 'Жак-Ив Кусто'}</h1>
            <button type="button" className="profile__edit-button" data-button="edit" onClick={onEditProfile}/>
          </div>
          <p className="profile__user-profession">{currentUser.about ? currentUser.about : 'Исследователь океана'}</p>
        </div>
        <button type="button" className="profile__add-button" data-button="add" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        {cards.map((e) => <Card key={e._id}{...e}
                                onCardClick={onCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}/>)}
      </section>
    </main>
  );
}

export default Main;