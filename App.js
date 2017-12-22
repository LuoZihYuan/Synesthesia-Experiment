import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { BleManager } from 'react-native-ble-plx'

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {id: '', name: ''}
    this.manager = new BleManager();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
          {this.state.id}
          {this.state.name}
        </Text>
      </View>
    );
  }
  componentWillMount() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
