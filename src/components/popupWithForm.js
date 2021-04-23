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
      const {name, value} = input
      inputValues[name] = value 
    })
    console.log(inputValues);
    return(inputValues);
  }

  openPopUp() {
    this.getInputValues()
    super.openPopUp()
  }

  closePopUp() {
    super.closePopUp()
    this._formElement.reset()
  } 

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit()
    })
  }
}


