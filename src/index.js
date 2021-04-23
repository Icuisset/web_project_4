///////////////////////////////////////
//    IMPORTED CLASSES
///////////////////////////////////////

// Test import of styles
import './page/index.css'

import FormValidator from './components/formValidator.js'
import Card from './components/card.js'
import PopupWithImage from './components/popupWithImage.js'
import PopupWithForm from './components/popupWithForm.js'

import Userinfo from './components/userInfo.js'
import Section from './components/section.js'
import Api from './components/api.js'
import Popup from './components/popup.js'

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
const confirmButton = document.querySelector('.confirm-button')


// access profile form
const formElementProfile = document.querySelector('.popup__form_type_profile')
const nameInput = formElementProfile.querySelector('.popup__input_value_name')
const aboutInput = formElementProfile.querySelector('.popup__input_value_about')
const nameValue = document.querySelector('.profile__name')
const aboutValue = document.querySelector('.profile__about')
const saveProfileButton = document.querySelector('.save-button')

// access avatar form
const formElementAvatar = document.querySelector('.popup__form_type_newAvatar')
const saveAvatarButton = document.querySelector('.saveAvatar-button')
const avatarImage = document.querySelector('.avatar')
const avatarHover = document.querySelector('.avatar-hover')


// access place form
const formElementPlace = document.querySelector('.popup__form_type_newPlace')
const placeTitleInput = formElementPlace.querySelector(
  '.popup__input_value_placeTitle'
)
const placeImageUrl = formElementPlace.querySelector(
  '.popup__input_value_placeImageLink'
)
const createPlaceButton = document.querySelector('.create-button')



//const elementTemplate = document.querySelector(".element-template").content.querySelector(".element");//
const elementsList = document.querySelector('.elements')

// const for all Api requests

//const myId = '3a51bab15266f7f25acd79d8'
let myId
let user
let cardList


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

// CARD CREATION

function createCard(newPlace,myId) {
  const newPlaceCard = new Card(
    newPlace,
    myId,
    '.element-template',
    openPopUpOnClick,
    openConfirmDelete,
    updateApiDelete,
    updateApiAddLike,
    updateApiRemoveLike
  )
  const newCreatedCard = newPlaceCard.createCard()
  cardList.addCard(newCreatedCard) 
}



// FORM SUBMISSIONS

// function to submit profile form and update user info

function profileFormSubmit() {
  const {
    profileNameInput,
    profileAboutInput
  } = profilePopUp.getInputValues()

  saveProfileButton.textContent = 'Saving...'

  api
    .editUserInfo(profileNameInput, profileAboutInput)
    .then((result) => {
      console.log(result);
      saveProfileButton.textContent = 'Saved'
      user = new Userinfo(result,nameValue,aboutValue,avatarImage, nameInput, aboutInput);
      user.setUserInfo(result);
      console.log(user);
      profilePopUp.closePopUp();
    })
    .catch((err) => {
      console.log(err)
    })
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
  createPlaceButton.textContent = 'Saving...'


  // post New created Card to Api
  api
    .postNewCard(placeTitleInput, placeImageLinkInput)
    .then((result) => {
      createPlaceButton.textContent = 'Saved'
      console.log(result._id)
      newPlace._id = result._id
      createCard(newPlace, myId);
      newPlacePopUp.closePopUp();
    })
    .catch((err) => {
      console.log(err)
    })
}

// function to submit new Avatar image and update profile image

function newAvatarFormSubmit() {
  const values = newAvatarPopUp.getInputValues();
  const link = values.avatarLink;

  if (link == '') {
    console.log('no input');
  } else {
    console.log(link);
    saveAvatarButton.textContent = 'Saving...';
    // post New Avatar link to Api
    api
      .editUserAvatar(link)
      .then((result) => {
        console.log(result);
        user = new Userinfo(result,nameValue,aboutValue,avatarImage, nameInput, aboutInput);
        user.setUserInfo(result);
        saveAvatarButton.textContent = 'Saved'
        newAvatarPopUp.closePopUp()
      })
      .catch((err) => {
        console.log(err)
      })
  }
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

// delete card
function deleteCard() {
 const DeleteCardId = confirmButton.getAttribute("id");
 updateApiDelete(DeleteCardId);
 confirmDeletePopUp.closePopUp();
}

// UPDATES TO API

// function to delete Card in Api
function updateApiDelete(cardId) {
  api
    .deleteCard(cardId)
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
      console.log(result, result.likes.length);
      return result.likes.length;
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
      console.log(result, result.likes.length);
      return result.likes.length;
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
    cardList = new Section({
        data: result,
        renderer: (card) => {
          createCard(card,myId);
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
    console.log(result);
    myId = result._id;
    user = new Userinfo(result,nameValue,aboutValue,avatarImage, nameInput, aboutInput);
    user.setUserInfo(result);
    console.log(user);
  })
  .catch((err) => {
    console.log(err)
  })


// create picture popup

const picturePopUp = new PopupWithImage('.popup_type_picture')
picturePopUp.setEventListeners()

// create confirm delete popup
const confirmDeletePopUp = new Popup ('.popup_type_confirmDelete');
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

// instruction for confirm button when deleting a card

confirmButton.addEventListener('click', () => {
  deleteCard()
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
  aboutInput,
  placeTitleInput,
  placeImageUrl,
  confirmButton
}