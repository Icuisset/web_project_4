import {
  confirmButton
} from '../index.js';
class Card {
  constructor(
    cardData,
    userId,
    templateSelector,
    openPopUpOnClick,
    openConfirmDelete,
    updateApiDelete,
    updateApiAddLike,
    updateApiRemoveLike
  ) {
    this._name = cardData.name
    this._link = cardData.link
    this._id = cardData._id

    if (cardData.hasOwnProperty('likes')) {
      this._likes = cardData.likes
    } else {
      this._likes = []
    }
    if (cardData.hasOwnProperty('owner')) {
      this._owner = cardData.owner._id
    } else {
      this._owner = userId
    }

    this._userID = userId

    this._templateSelector = templateSelector

    this._openPopUpOnClick = openPopUpOnClick

    this._openConfirmDelete = openConfirmDelete

    this._updateApiDelete = updateApiDelete
    this._updateApiAddLike = updateApiAddLike
    this._updateApiRemoveLike = updateApiRemoveLike
  }

  _getTemplate() {
    const elementTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
    return elementTemplate
  }

  // CHECK IF OK TO DELETE

  _confirmToDelete(deleteButton) {
    console.log(confirmButton);
    confirmButton.addEventListener('click', () => {
      if(confirmButton.id + "ok" === deleteButton.id )
      { console.log(confirmButton.id + "ok" === deleteButton.id );
        const deletedCard = deleteButton.closest(".element");
        deletedCard.remove();}
    });
  }


  /* Event listener for Delete Button */

  _handleDeleteButton() {
    const deleteButton = this._card.querySelector('.delete-button');
    if (this._owner === this._userID) {
      deleteButton.addEventListener('click', () => {
        this._openConfirmDelete();
        confirmButton.setAttribute("id", this._id);
        deleteButton.setAttribute("id", this._id + "ok");
        this._confirmToDelete(deleteButton);
      });
    } else {
      deleteButton.remove()
    }
  }

  _likeElement(likeButton) {
    likeButton.classList.toggle('like-button_activated')
    if (likeButton.classList.contains('like-button_activated')) {
      this._updateApiAddLike(this._id)
      this._updateLikes(1)
    } else {
      this._updateApiRemoveLike(this._id)
      this._updateLikes(0)
    }
  }

  /* Event listener for Like Button */
  _handleLikeButton() {
    const likeButton = this._card.querySelector('.like-button');
    if (this._likes.some(i => i._id === this._userID)) {
      likeButton.classList.add('like-button_activated')
    };
    likeButton.addEventListener('click', () => {
      this._likeElement(likeButton);
    })
  }

  /* Event lister for Card Click */
  _handleCardClick() {
    const createdElementImage = this._card.querySelector('.element__image')
    createdElementImage.addEventListener('click', () => {
      this._openPopUpOnClick(this._link, this._name)
    })
  }

  /* update number of likes */
  _updateLikes(i) {
    const numberOfLikes = this._card.querySelector('.element__like-count')
    numberOfLikes.textContent = this._likes.length + i
  }


  /* Return ID */
  getCardId() {
    return this._id
  }


  /* Method to create each card*/

  createCard() {
    this._card = this._getTemplate().cloneNode(true)

    const createdElementImage = this._card.querySelector('.element__image')
    const createdElementTitle = this._card.querySelector('.element__title')

    // fill each element with corresponding initial content
    createdElementTitle.textContent = this._name
    createdElementImage.src = this._link
    createdElementImage.alt = `${this._name} picture`

    // handle all buttons and clicks
    this._handleLikeButton()
    this._handleCardClick()
    this._updateLikes(0)
    this._handleDeleteButton()

    return this._card
  }
}

export default Card