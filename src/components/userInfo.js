export default class UserInfo {
  constructor(nameValue, aboutValue, avatarImage, nameInput, aboutInput) {

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
    return this._nameValue.textContent
  }

  getUserAbout() {
    return this._aboutValue.textContent
  }

  getUserAvatar() {
    return this._avatar
  }


  setUserInfo(userData) {
    this._nameValue.textContent = userData.name
    this._aboutValue.textContent = userData.about
    this._avatarImage.style.backgroundImage = "url('" + userData.avatar + "')"
  }
}