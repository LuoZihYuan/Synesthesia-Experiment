import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert'

import { RoboArm } from './SERoboArm'
import { SEAlertCentre } from './SEAlertCentre';

export default class App extends Component<{}> {

  _alertCentre: SEAlertCentre

  render() {
    return (
      <View style={styles.container}>
        <DropdownAlert
          ref={ref => this._alertCentre = new SEAlertCentre(ref)}/>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button
          onPress={() => this.connectRobo()}
          title="Connect"
          color="#841584"
        />
      </View>
    );
  }
  connectRobo() {
    this._alertCentre.showAlert('info', 'info', 'first try ever');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
