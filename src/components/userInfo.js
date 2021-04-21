import { nameValue, aboutValue, avatarImage } from '../index.js'

export default class UserInfo {
  constructor(data) {
    this._name = data.name
    this._about = data.about
    this._avatar = data.avatar
    this._id = data._id
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

  setUserInfo() {
    nameValue.textContent = this._name
    aboutValue.textContent = this._about
    avatarImage.style.backgroundImage = "url('" + this._avatar + "')"
  }
}
