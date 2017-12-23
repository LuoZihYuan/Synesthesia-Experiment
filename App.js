import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert'

import { SERoboArm } from './SERoboArm'
import { SEUserNotice } from './SEUserNotice';

export default class App extends Component<{}> {

  _userNotice: SEUserNotice
  
  _roboArm: SERoboArm

  constructor() {
    super();
    this._roboArm = new SERoboArm();
    this._userNotice = new SEUserNotice();
  }
  render() {
    return (
      <View style={styles.container}>
        <DropdownAlert
          ref={ref => this._userNotice.setDropDown(ref)}
        />
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

  componentDidMount() {
    this.connectRobo();
  }

  connectRobo() {
    this._roboArm.requestConnection();
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
