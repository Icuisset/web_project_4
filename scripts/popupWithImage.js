import Popup from './popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupPicture = this._popupElement.querySelector('.popup__picture')
    this._popupCaption = this._popupElement.querySelector(
      '.popup__picture-caption'
    )
  }

  openPopUp(link, caption) {
    this._popupPicture.src = link
    this._popupCaption.textContent = caption
    this._popupPicture.alt = `${this._name} picture`
    super.openPopUp()
  }
}
