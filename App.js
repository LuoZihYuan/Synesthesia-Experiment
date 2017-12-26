import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
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
    let appNames = require('./assets/images/icons.json');
    while(appNames.length > 6) {
      appNames.pop()
    }

    return (
    <ImageBackground style={styles.container}
      source={require('./assets/images/background.jpg')}
    >
      <DropdownAlert
        ref={ref => this._userNotice.setDropDown(ref)}
      />
      
      <FlatList
        style={styles.tableContainer}
        scrollEnabled={false}
        data={appNames}
        renderItem={this._renderRow}
      />
      
    </ImageBackground>
    );
  }

  _renderRow = (row) => {
    return (
      <FlatList
        style={styles.rowContainer}
        horizontal={true}
        scrollEnabled={false}
        data={row.item.row}
        renderItem={this._renderCol}
      />
    );
  }

  _renderCol = (col) => {
    return (
      <View
        style={styles.colContainer}
      >
        {/* <ImageBackground style={styles.buttonImage}>
        </ImageBackground> */}
        <TouchableWithoutFeedback>
          <Image style={styles.buttonMask}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.buttonTitle}
          numberOfLines={1}
          // ellipsizeMode='tail'
        >
          {col.item.col}
        </Text>
      </View>
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
  tableContainer: {
    marginTop: 28
  },
  rowContainer: {
    marginBottom: 8
  },
  colContainer: {
    marginLeft: 13.5,
    marginRight: 13.5
  },
  buttonImage: {
    height: 60,
    width: 60
  },
  buttonTitle: {
    width: 60,
    color: 'white',
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingTop: 5
  },
  buttonMask: {
    height: 60,
    width: 60,
    borderRadius: 14,
    opacity: 0.4,
    backgroundColor: 'black'
  }
});
