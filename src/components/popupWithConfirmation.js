import Popup from './popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, updateApiDelete) {
    super(popupSelector)
    this._confirmButton = this._popupElement.querySelector(".confirm-button")
    this._updateApiDelete = updateApiDelete
  }

  _deleteCard() {
    this._deleteCardId = this._confirmButton.getAttribute("id");
    this._updateApiDelete(this._deleteCardId);
  }


  setEventListeners() {
    super.setEventListeners()
    this._confirmButton.addEventListener('click', () => {
      this._deleteCard()
    })
  }
}


