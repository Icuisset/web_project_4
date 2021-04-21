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
