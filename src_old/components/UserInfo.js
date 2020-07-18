export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector, jobInput, nameInput) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._jobInput = jobInput;
    this._nameInput = nameInput;
  }

  getUserInfo() {
    this._userInfoObj = {};
    this._userInfoObj['name'] = this._userNameSelector.textContent;
    this._userInfoObj['about'] = this._userInfoSelector.textContent;
    return this._userInfoObj;
  }

  setUserInfo(obj) {
    this._userNameSelector.textContent = obj.name;
    this._userInfoSelector.textContent = obj.about;
    this._userNameSelector.id = obj._id;
    this._userAvatarSelector.src = obj.avatar;
  }

  setUserInfoToForm(obj) {
    this._nameInput.value = obj.name;
    this._jobInput.value = obj.about;
  }
}