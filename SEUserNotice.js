import PropTypes from 'prop-types';
import DropdownAlert from 'react-native-dropdownalert'

let _singleton = null

export class SEUserNotice {

  _dropdown: DropdownAlert
  
  constructor() {
    if (!_singleton) {
      _singleton = this;
    }
    return _singleton
  }
  
  setDropDown(dropdown: DropdownAlert) {
    this._dropdown = dropdown;
  }

  showNotice(type: string, title: string, message: string, onClose: ?PropTypes.func, onCancel: ?PropTypes.func) {
    if (this._dropdown) {
      this._dropdown.props.onClose = onClose;
      this._dropdown.props.onCancel = onCancel;
      this._dropdown.alertWithType(type, title, message);
    } 
  }

  closeNotice() {
    if (this._dropdown) {
      this._dropdown.close();
    }
  }
}
