import Popup from './popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector)
    this._formSubmit = formSubmit
    this._formElement = this._popupElement.querySelector('.popup__form')
    this._inputs = Array.from(
      this._formElement.querySelectorAll('.popup__input')
    )
  }

  // catch input values

  getInputValues() {
    const inputValues = {}
    this._inputs.forEach((input) => {
      const inputName = input.name
      const inputValue = input.value
      inputValues[inputName] = inputValue
    })
    return inputValues
  }

  // new public method to reinitialize inputs values after submitting a form ( probably more elegant indeed than my previous trials...)

  resetInputValues() {
    this._inputs.forEach((input) => {
      input.value = ''
    })
  }

  openPopUp() {
    this.getInputValues()
    super.openPopUp()
  }

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._formSubmit()
    })
  }
}
