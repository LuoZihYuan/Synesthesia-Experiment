'use strict'

import { Alert } from 'react-native'
import { BleManager } from 'react-native-ble-plx'

import { SEAlertCentre } from './SEAlertCentre';

export class SERoboArm {

  _manager: BleManager
  _alertCentre = SEAlertCentre.sharedCentre;

  constructor() {
    this._manager = new BleManager();
  }
  
  connect() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }
  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      this.setState({id: device.id, name: device.name})
      // if (device.name === 'TI BLE Sensor Tag' || 
      //     device.name === 'SensorTag') {
          
      //     // Stop scanning as it's not necessary if you are scanning for one device.
      //     this.manager.stopDeviceScan();

      //     // Proceed with connection.
      // }
    });
  }

}
