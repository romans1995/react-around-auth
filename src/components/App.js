import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup .js";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import DeleteCardPopup from "./DeleteCardPopup"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";

// css
import "../index.css";
import "../blocks/body.css";
import "../blocks/header.css";
import "../blocks/main.css";
import "../blocks/profile.css";
import "../blocks/elements.css";
import "../blocks/element.css";
import "../blocks/popup.css";
import "../blocks/footer.css";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isetDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPlaceSubmit = (name, link) => {
    setIsLoading(true);
    api.createCard({ name, link }).then((newCard) => {
      setIsLoading(false);
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(console.log);
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((cards) => cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch(console.log);
  }
  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api.deleteCard(selectedCard._id).then((newCard) => {
      setIsLoading(false);
      const newCards = cards.filter(
        (currentCard) => currentCard._id !== selectedCard._id
      );
      setCards(newCards);
      closeAllPopups();
    }).catch(console.log);
  }
  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about }).then((res) => {
        setIsLoading(false);
        setCurrentUser(res)
        closeAllPopups();
      }).catch(console.log);
  }
  const handleUpdateAvatar = (url) => {
    setIsLoading(true);
    api.setAvatarImage(url).then((res) => {
      setIsLoading(false);
      setCurrentUser(res);
      closeAllPopups();
    }).catch(console.log);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };


  const handleDeleteButtonClick = (card) => {
    setDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePreviewOpen(false);
    setDeletePopupOpen(false);
  };
  const handleCardClick = (card) => {
    setIsImagePreviewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])


  useEffect(() => {
    api
      .getUserInformation()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(console.log);
  }, []);
  useEffect(() => {
    api
      .getInitalCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          handleCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteButtonClick}
        />
        <Footer />

        <PopupWithForm
          title="Are you sure?"
          name="delete-card"
          buttonText="Delete"
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit}
          isLoading={isLoading} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePreviewOpen}
          onClose={closeAllPopups}
        />
        <DeleteCardPopup
          isLoading={isLoading}
          isOpen={isetDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
