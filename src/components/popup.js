export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
    this._closeButton = this._popupElement.querySelector('.close-button')
    this._overlay = this._popupElement.querySelector('.popup__overlay')
    this._handleCloseByEscape = this._handleCloseByEscape.bind(this)
  }

  openPopUp() {
    this._popupElement.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleCloseByEscape)
  }

  closePopUp() {
    this._popupElement.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleCloseByEscape)
  }

  _handleCloseByEscape(event) {
    const key = event.key
    if (key === 'Escape') {
      this.closePopUp()
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.closePopUp()
    })
    this._overlay.addEventListener('click', () => {
      this.closePopUp()
    })
  }
}

// KEEPING OLD CODE FOR PERSONAL REFERENCE
/*
function openNewPlacePopUp() {
    placeTitleInput.value = "";
    placeImageUrl.value = "";
    openPopUp(newPlacePopUp);
}
*/

// to open profile popup with correct profile information
/*
function openProfilePopUp() {
    //update input values in profile popup
    nameInput.value = nameValue.textContent;
    aboutInput.value = aboutValue.textContent;
    openPopUp(profilePopUp);
}
*/

// to open and close general popups - exported to utils.js

//function openPopUp(targetPopUp) {
//  targetPopUp.classList.add("popup_opened");
//document.addEventListener('keydown', closeByEscape);
//}

//function closePopUp(targetPopUp) {
//  targetPopUp.classList.remove("popup_opened");
//document.removeEventListener('keydown', closeByEscape);
//}

// access picture popup information - moved to card class
//const popupPicture = document.querySelector(".popup__picture");
//const popupCaption = document.querySelector(".popup__picture-caption");

// access popup overlay
//const popUpOverlays = Array.from(document.querySelectorAll(".popup__overlay"));
