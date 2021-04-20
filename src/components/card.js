class Card {
  constructor(
    cardData,
    userId,
    templateSelector,
    openPopUpOnClick,
    openConfirmDelete,
    closeConfirmDelete,
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
    this._closeConfirmDelete = closeConfirmDelete

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

  _checkandDelete() {
    const confirmButton = document.querySelector('.confirm-button')
    confirmButton.addEventListener('click', () => {
      this._deleteElement()
    })
  }
  // BUTTONS METHODS

  _deleteElement() {
    console.log(this._id)
    this._updateApiDelete(this._id)
    this._card.remove()
    this._closeConfirmDelete()
  }

  /* Event listener for Delete Button */

  _handleDeleteButton() {
    const deleteButton = this._card.querySelector('.delete-button')
    console.log(this._card)

    if (this._owner === this._userID) {
      deleteButton.addEventListener('click', () => {
        this._openConfirmDelete()
        this._checkandDelete()
      })
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
    const likeButton = this._card.querySelector('.like-button')
    likeButton.addEventListener('click', () => this._likeElement(likeButton))
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