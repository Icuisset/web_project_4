export default class UserInfo {
  constructor(userData, nameValue, aboutValue, avatarImage, nameInput, aboutInput) {
    this._name = userData.name
    this._about = userData.about
    this._avatar = userData.avatar
    this._id = userData._id

    this._nameValue = nameValue
    this._aboutValue = aboutValue
    this._avatarImage = avatarImage

    this._nameInput = nameInput
    this._aboutInput = aboutInput
  }

  getUserId() {
    return this._id
  }

  getUserName() {
    return this._name
  }

  getUserAbout() {
    return this._about
  }

  getUserAvatar() {
    return this._avatar
  }

  setUserInfo(userData) {
    this._nameValue.textContent = this._name
    this._aboutValue.textContent = this._about
    this._avatarImage.style.backgroundImage = "url('" + this._avatar + "')"
    this._nameInput.placeholder = this._name
    this._aboutInput.placeholder = this._about
  }
}