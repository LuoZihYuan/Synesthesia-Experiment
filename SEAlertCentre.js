import DropdownAlert from 'react-native-dropdownalert'

const MAIN_INFO_COLOR = '#2B73B6'
const MAIN_WARN_COLOR = '#cd853f'
const MAIN_ERROR_COLOR = '#cc3232'
const MAIN_SUCCESS_COLOR = '#32A54A'
const MAIN_CUSTOM_COLOR = '#6441A4'
const MAIN_DISMISS_COLOR = '#748182'

let _singleton = null

export class SEAlertCentre {

  static sharedCentre = _singleton;
  _dropdown: DropdownAlert
  
  constructor(dropdown) {
    if (!_singleton) {
      this._dropdown = dropdown;
      _singleton = this;
    } else {
      return _singleton
    }
  }

  showAlert(type: string, title: string, message: string) {
    this._dropdown.alertWithType(type, title, message);
  }

  closeAlert() {
    
  }

}
