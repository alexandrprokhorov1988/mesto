import React from 'react';
import avatarBg from '../images/avatar-bg.png';
import api from "../utils/api";
import Card from "../components/Card";

function Main({onEditAvatar, onCardClick, onAddPlace, onEditProfile}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, card]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setUserId(user._id);
        setCards(card.map(item => ({
          link: item.link,
          alt: item.alt,
          _id: item._id,
          name: item.name,
          likes: item.likes,
          onCardClick: onCardClick
        })))
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={userAvatar ? userAvatar : avatarBg} alt="Аватар." className="profile__avatar"/>
          <div className="profile__bg">
            <button type="button" className="profile__avatar-edit-button" data-button="editAvatar"
                    onClick={onEditAvatar}/>
          </div>
        </div>
        <div className="profile__user-info">
          <div className="profile__row">
            <h1 className="profile__user-name" id={userId ? userId : ''}>{userName ? userName : 'Жак-Ив Кусто'}</h1>
            <button type="button" className="profile__edit-button" data-button="edit" onClick={onEditProfile}/>
          </div>
          <p className="profile__user-profession">{userDescription ? userDescription : 'Исследователь океана'}</p>
        </div>
        <button type="button" className="profile__add-button" data-button="add" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        {cards.map((e) => <Card key={e._id}{...e}/>)}
      </section>
    </main>
  );
}

export default Main;