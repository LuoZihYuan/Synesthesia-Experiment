'use strict'

// Standard React Library
import { Linking } from 'react-native'
// Third Party Library
import { BleManager } from 'react-native-ble-plx' // https://www.polidea.com/blog/ReactNative_and_Bluetooth_to_An_Other_level/
// Dependent Module
import { SEUserNotice } from './SEUserNotice';

export class SERoboArm {

  _manager: BleManager
  _userNotice: SEUserNotice

  constructor() {
    this._manager = new BleManager();
    this._userNotice = new SEUserNotice();
    this.searchCondition = {name: 'MacBook Pro (2)'}
  }
  
  requestConnection() {
    const subscription = this._manager.onStateChange((state) => {
      if (state === 'Unsupported') {
        this._userNotice.showNotice('error',
                                    'BLE Unsupported',
                                    'This device does not support Bluetooth Low Energy',
                                    null, null);
      } else if (state === 'Unauthorized') {
        this._userNotice.showNotice('warn',
                                    'Bluetooth Unauthorized',
                                    'Require Bluetooth authorization to connect to our Robotic Arm',
                                    null, null);
      } else if (state === 'PoweredOff') {
        var noticeEnd = data => {
          console.log(data);
          Linking.openURL('app-settings:root=General&path=Bluetooth');
        }
        this._userNotice.showNotice('warn',
                                    'Bluetooth OFF',
                                    'Turn ON Bluetooth to start connecting...',
                                    noticeEnd, noticeEnd);
      } else if (state === 'PoweredOn') {
        this._connect();
        subscription.remove();
      }
    }, true);
  }
  _connect() {
    this._manager.startDeviceScan(null, null, (error, device) => {
      console.log(device)

      if (error) {
        console.error(error)
        return
      }
      if (device.name === this.searchCondition.name) {

        this._manager.stopDeviceScan();
        device.connect()
          .then((device) => {
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            return this.setupNotifications(device)
          })
          .catch((error) => {
            console.error(error)
          });
      }
    });
  }

  async setupNotifications(device) {
    for (const id in this.sensors) {

      const characteristic = await device.writeCharacteristicWithResponseForService(
        service, characteristicW, "AQ==" /* 0x01 in hex */
      )

      device.monitorCharacteristicForService(service, characteristicN, (error, characteristic) => {
        if (error) {
          console.error(error.message)
          return
        }
        this.updateValue(characteristic.uuid, characteristic.value)
      })
    }
  }

  disConnect() {
    
  }
}
