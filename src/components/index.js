///////////////////////////////////////
//    IMPORTED CLASSES
///////////////////////////////////////

import FormValidator from './formValidator.js'
import Card from './card.js'
import initialCards from './initialcards.js'
import PopupWithImage from './popupWithImage.js'
import PopupWithForm from './popupWithForm.js'

import Userinfo from './userInfo.js'
import Section from './section.js'
import Api from './api.js'
import Popup from './popup.js'

///////////////////////////////////////
//    GLOBAL VARIABLES
///////////////////////////////////////

// initial form settings

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

// access general buttons

const editButton = document.querySelector('.edit-button')
const addButton = document.querySelector('.add-button')

// access profile form
const formElementProfile = document.querySelector('.popup__form_type_profile')
const nameInput = formElementProfile.querySelector('.popup__input_value_name')
const aboutInput = formElementProfile.querySelector('.popup__input_value_about')
const nameValue = document.querySelector('.profile__name')
const aboutValue = document.querySelector('.profile__about')
const avatarImage = document.querySelector('.avatar')
const avatarHover = document.querySelector('.avatar-hover')
const saveProfileButton = document.querySelector('.save-button')

// access place form
const formElementPlace = document.querySelector('.popup__form_type_newPlace')
const placeTitleInput = formElementPlace.querySelector(
  '.popup__input_value_placeTitle'
)
const placeImageUrl = formElementPlace.querySelector(
  '.popup__input_value_placeImageLink'
)
const createPlaceButton = document.querySelector('.create-button')

// access avatar form
const formElementAvatar = document.querySelector('.popup__form_type_newAvatar')
const saveAvatarButton = document.querySelector('.saveAvatar-button')

//const elementTemplate = document.querySelector(".element-template").content.querySelector(".element");//
const elementsList = document.querySelector('.elements')

// const for all Api requests

const myId = '3a51bab15266f7f25acd79d8'

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-7',
  headers: {
    authorization: '9df52f9f-cc17-4475-93ad-607c569a3f4b',
    'Content-Type': 'application/json',
  },
})

///////////////////////////////////////
//    ALL FUNCTIONS
///////////////////////////////////////

// FORM SUBMISSIONS

// function to submit profile form and update user info

function profileFormSubmit() {
  const { profileNameInput, profileAboutInput } = profilePopUp.getInputValues()

  nameValue.textContent = profileNameInput
  aboutValue.textContent = profileAboutInput
  saveProfileButton.innerHTML = 'Saving...'
  // checking that it works but it is very fast !
  console.log(saveProfileButton.innerHTML)

  api
    .editUserInfo(profileNameInput, profileAboutInput)
    .then((result) => {
      console.log(result)
      saveProfileButton.innerHTML = 'Saved'
      // check
      console.log(saveProfileButton)
    })
    .catch((err) => {
      console.log(err)
    })

  profilePopUp.closePopUp()
}

// function to submit new Place form and create a new place

function newPlaceFormSubmit() {
  const newPlace = {}
  const {
    placeTitleInput,
    placeImageLinkInput,
  } = newPlacePopUp.getInputValues()

  newPlace.name = placeTitleInput
  newPlace.link = placeImageLinkInput
  createPlaceButton.innerHTML = 'Saving...'
  console.log(createPlaceButton.innerHTML)

  // post New created Card to Api
  api
    .postNewCard(placeTitleInput, placeImageLinkInput)
    .then((result) => {
      createPlaceButton.innerHTML = 'Saved'
      console.log(result._id)
      newPlace._id = result._id
      const newPlaceCard = new Card(
        newPlace,
        myId,
        '.element-template',
        openPopUpOnClick,
        openConfirmDelete,
        closeConfirmDelete,
        updateApiDelete,
        updateApiAddLike,
        updateApiRemoveLike
      )

      const newCreatedPlaceCard = newPlaceCard.createCard()

      elementsList.prepend(newCreatedPlaceCard)

      newPlacePopUp.closePopUp()

      newPlacePopUp.resetInputValues()
    })
    .catch((err) => {
      console.log(err)
    })
}

// function to submit new Avatar image and update profile image

function newAvatarFormSubmit() {
  const { avatarLink } = newAvatarPopUp.getInputValues()

  avatarImage.style.backgroundImage = 'url(' + avatarLink + ')'
  saveAvatarButton.innerHTML = 'Saving...'

  // post New Avatar link to Api
  api
    .editUserAvatar(avatarLink)
    .then((result) => {
      console.log(result)
      saveAvatarButton.innerHTML = 'Saved'
    })
    .catch((err) => {
      console.log(err)
    })

  newAvatarPopUp.closePopUp()

  newAvatarPopUp.resetInputValues()
}

// OPENING POP UPS

// function to open picture popup on click
function openPopUpOnClick(link, caption) {
  picturePopUp.openPopUp(link, caption)
}

// function to open confirm delete popup on click
function openConfirmDelete() {
  confirmDeletePopUp.openPopUp()
}

// function to close confirm delete popup
function closeConfirmDelete() {
  confirmDeletePopUp.closePopUp()
}

// UPDATES TO API

// function to update Api deleting cards
function updateApiDelete(id) {
  api
    .deleteCard(id)
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

// function to update Api adding a Card like
function updateApiAddLike(id) {
  api
    .addCardLike(id)
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

// function to update Api removing a Card like
function updateApiRemoveLike(id) {
  api
    .removeCardLike(id)
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

///////////////////////////////////////
//    ACTIONS TO INITIALISE PAGE
///////////////////////////////////////

// instructions to create initial cards

api
  .getInitialCards()
  .then((result) => {
    const cardList = new Section(
      {
        data: result,
        renderer: (card) => {
          const newCard = new Card(
            card,
            myId,
            '.element-template',
            openPopUpOnClick,
            openConfirmDelete,
            closeConfirmDelete,
            updateApiDelete,
            updateApiAddLike,
            updateApiRemoveLike
          )
          const newCreatedCard = newCard.createCard()
          cardList.addCard(newCreatedCard)
        },
      },
      '.elements'
    )
    cardList.renderItems()
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  })

// instructions to get initial user info

api
  .getUserInfo()
  .then((result) => {
    const user = new Userinfo(result)
    user.setUserInfo()
  })
  .catch((err) => {
    console.log(err)
  })

// create picture popup

const picturePopUp = new PopupWithImage('.popup_type_picture')
picturePopUp.setEventListeners()

// create confirm delete popup
const confirmDeletePopUp = new Popup('.popup_type_confirmDelete')
confirmDeletePopUp.setEventListeners()

// instruction to create form validators

const profileFormValidator = new FormValidator(settings, formElementProfile)
const placeFormValidator = new FormValidator(settings, formElementPlace)
const avatarFormValidator = new FormValidator(settings, formElementAvatar)

profileFormValidator.enableValidation()
placeFormValidator.enableValidation()
avatarFormValidator.enableValidation()

// instructions to create form popups

const profilePopUp = new PopupWithForm(
  '.popup_type_editProfile',
  profileFormSubmit
)

const newPlacePopUp = new PopupWithForm(
  '.popup_type_newPlace',
  newPlaceFormSubmit
)

const newAvatarPopUp = new PopupWithForm(
  '.popup_type_newAvatar',
  newAvatarFormSubmit
)

// set event listeners

profilePopUp.setEventListeners()

newPlacePopUp.setEventListeners()

newAvatarPopUp.setEventListeners()

// instructions for edit profile button

editButton.addEventListener('click', () => {
  profilePopUp.openPopUp()
})

// instructions for add button

addButton.addEventListener('click', () => {
  newPlacePopUp.openPopUp()
})

// instruction for avatar image on click
avatarImage.addEventListener('click', () => {
  newAvatarPopUp.openPopUp()
})

// instructions for avatar image on hover and off hover( no way to get :hover functioning on css unfortunately :-( )
avatarImage.addEventListener('mouseover', () => {
  avatarHover.style.opacity = 1
})

avatarImage.addEventListener('mouseout', () => {
  avatarHover.style.opacity = 0
})

///////////////////////////////////////
//    EXPORT
////////////////////////////////////////

export {
  nameInput,
  nameValue,
  aboutInput,
  aboutValue,
  avatarImage,
  placeTitleInput,
  placeImageUrl,
}
