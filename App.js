import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground
} from 'react-native';

import DropdownAlert from 'react-native-dropdownalert'

import { SEUserNotice } from './SEUserNotice';

export default class App extends Component<{}> {

  _userNotice: SEUserNotice

  constructor() {
    super();
    this._userNotice = new SEUserNotice();
  }
  render() {
    return (
    <ImageBackground style={styles.container}
      source={require('./assets/images/background.jpg')}>
      <DropdownAlert
        ref={ref => this._userNotice.setDropDown(ref)}
      />
      <TouchableHighlight
        onPress={() => this.connectRobo()}
        backgroundColor='transparent'
      >
        <Text>Connect</Text>
      </TouchableHighlight>
    </ImageBackground>
    );
  }

  componentDidMount() {
    this.connectRobo();
  }

  connectRobo() {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparent: {
    backgroundColor: 'transparent',
  }
});
