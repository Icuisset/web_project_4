///////////////////////////////////////
//    IMPORTED CLASSES
///////////////////////////////////////

// Test import of styles
import './index.css'


import FormValidator from '../components/formValidator.js'
import Card from '../components/card.js'
import PopupWithImage from '../components/popupWithImage.js'
import PopupWithForm from '../components/popupWithForm.js'
import PopupWithConfirmation from '../components/popupWithConfirmation.js'

import Userinfo from '../components/userInfo.js'
import Section from '../components/section.js'
import Api from '../components/api.js'


///////////////////////////////////////
//    GLOBAL VARIABLES
///////////////////////////////////////
/* my profile is much slower to update when I put my constants in another folder */

import {
  settings,
  editButton,
  addButton,
  formElementProfile,
  nameInput,
  nameValue,
  aboutInput,
  aboutValue,
  saveProfileButton,
  formElementAvatar,
  saveAvatarButton,
  avatarImage,
  avatarHover,
  formElementPlace,
  placeTitleInput,
  placeImageUrl,
  createPlaceButton,
  confirmButton
}
from '../components/utils/constants.js'


//const myId = '3a51bab15266f7f25acd79d8'
let myId
console.log(myId);
let cardList


const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-7',
  headers: {
    authorization: '9df52f9f-cc17-4475-93ad-607c569a3f4b',
    'Content-Type': 'application/json',
  },
})

// create User
const user = new Userinfo(nameValue, aboutValue, avatarImage, nameInput, aboutInput);

///////////////////////////////////////
//    ALL FUNCTIONS
///////////////////////////////////////

// CARD CREATION

function createCard(newPlace, myId) {
  const newPlaceCard = new Card(
    newPlace,
    myId,
    '.element-template',
    openPopUpOnClick,
    openConfirmDelete,
    updateApiDelete,
    updateApiAddLike,
    updateApiRemoveLike,
    confirmButton
  )
  const newCreatedCard = newPlaceCard.createCard()
  return newCreatedCard
  //cardList.addCard(newCreatedCard)
}



// FORM SUBMISSIONS

// function to submit profile form and update user info

function profileFormSubmit() {
  const {
    profileNameInput,
    profileAboutInput
  } = profilePopUp.getInputValues();

  saveProfileButton.textContent = 'Saving...';

  api
    .editUserInfo(profileNameInput, profileAboutInput)
    .then((result) => {
      console.log(result);
      saveProfileButton.textContent = 'Saved';
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
      createPlaceButton.textContent = 'Saved';
      const newCreatedCard = createCard(result, myId);
      cardList.addCard(newCreatedCard);
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


// UPDATES TO API

// function to delete Card in Api
function updateApiDelete(cardId) {
  api
    .deleteCard(cardId)
    .then((result) => {
      console.log(result)
      confirmDeletePopUp.closePopUp()
    })
    .catch((err) => {
      console.log(err)
    })
}

// function to update Api adding a Card like
function updateApiAddLike(card, id) {
  api
    .addCardLike(id)
    .then((result) => {
      console.log(result, result.likes.length);
      const newLikes = result.likes.length;
      card.updateLikes(newLikes);
    })
    .catch((err) => {
      console.log(err)
    })
}

// function to update Api removing a Card like
function updateApiRemoveLike(card, id) {
  api
    .removeCardLike(id)
    .then((result) => {
      console.log(result, result.likes.length);
      const newLikes = result.likes.length;
      card.updateLikes(newLikes);
    })
    .catch((err) => {
      console.log(err)
    })
}



// function to update CardList
function updateCardList(info) {
  cardList = new Section({
      data: info,
      renderer: (card) => {
        const newCreatedCard = createCard(card, myId);
        cardList.addCard(newCreatedCard);
      },
    },
    '.elements'
  )
  cardList.renderItems()
}

///////////////////////////////////////
//    ACTIONS TO INITIALISE PAGE
///////////////////////////////////////

// instructions to create initial cards and user info
// calling both promises together

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    updateCardList(cards);
    console.log(cards);
    console.log(userData);
    myId = userData._id;
    user.setUserInfo(userData);
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
    console.log(user);
  })
  .catch((err) => {
    console.log(err)
  })


//Promise syntax individual - NOT NEEDED BUT KEEPING FOR PERSONAL REFERENCE

const promiseforCards =
  api
  .getInitialCards()
  .then((result) => {
    updateCardList(result);
    console.log(result);
  })
  .catch((err) => {
    console.log(err)
  })


//Promise syntax individual - NOT NEEDED BUT KEEPING FOR PERSONAL REFERENCE

const promiseforUser =
api
  .getUserInfo()
  .then((result) => {
        console.log(result);
    myId = result._id;
    user.setUserInfo(result);
    nameInput.value = result.name;
    aboutInput.value = result.about;
    console.log(user);
  })
  .catch((err) => {
    console.log(err)
  })


// create picture popup

const picturePopUp = new PopupWithImage('.popup_type_picture')
picturePopUp.setEventListeners()

// create confirm delete popup
const confirmDeletePopUp = new PopupWithConfirmation('.popup_type_confirmDelete', updateApiDelete);
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
  profilePopUp.openPopUp();
  nameInput.value = user.getUserName();
  aboutInput.value = user.getUserAbout();
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