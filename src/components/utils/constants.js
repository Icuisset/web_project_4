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
  //const elementsList = document.querySelector('.elements')
  
  // const for all Api requests

export {
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