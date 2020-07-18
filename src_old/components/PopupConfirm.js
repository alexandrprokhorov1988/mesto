import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor({popupSelector, buttonSelector, confirmFunction}) {
    super(popupSelector);
    this._button = this._popup.querySelector(`${buttonSelector}`);
    this._confirmFunction = confirmFunction;
    this._setEventListeners();
  }

  setId(id) {
    this._id = id;
  }

  setCard(card) {
    this._card = card;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._button.addEventListener('click', (event) => {
      event.preventDefault();
      this._button.disabled = true;
      this._confirmFunction(this._id);
      document.querySelector(`[data-id=\"${this._id}\"]`).closest(`.${this._card}`).remove();
      this._card = null;
      this.close();
    });
  };

  open(){
    this._button.disabled = false;
    super.open();
  }
}