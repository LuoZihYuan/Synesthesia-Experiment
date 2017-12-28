import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import DropdownAlert from 'react-native-dropdownalert'

import { SEUserNotice } from './SEUserNotice';

export default class App extends Component<{}> {

  _userNotice: SEUserNotice

  constructor() {
    super();
    this._userNotice = new SEUserNotice();
    this.numberOfColumns = 4;
    this.appInfo = require('./assets/images/icons.json');
  }

  render() {
    while(this.appInfo.length > 17) {
      this.appInfo.pop();
    }

    return (
      <ImageBackground
        style={styles.container}
        source={require('./assets/images/background.jpg')}>
        <DropdownAlert ref={ref => this._userNotice.setDropDown(ref)}/>
        <FlatList
          numColumns={this.numberOfColumns}
          style={styles.tableContainer}
          scrollEnabled={false}
          data={this.appInfo}
          renderItem={this._renderItem}/>
      </ImageBackground>
    );
  }
  _renderItem = (item) => {
    let imageSource = Platform.select({
      ios: item.item.key,
      android: item.item.key.toLowerCase().replace(' ', '_')
    })
    let _onAppPress = this._onAppPress;

    return (
      <View style={styles.appContainer}>
        <Image
          style={styles.appImage}
          source={{uri: imageSource}}/>
        <TouchableOpacity
          ref={item.index}
          onPress={function(){_onAppPress(this)}}
          activeOpacity={0.35}
          style={styles.appMask}>
          <Text style={styles.appMetaData}>{JSON.stringify({index: item.index, key: item.item.key})}</Text>
        </TouchableOpacity>
        <Text
          style={styles.appTitle}
          numberOfLines={1}>
          {item.item.key}
        </Text>
      </View>
    );
  }

  _onAppPress = (ref) => {
    let pressedApp = JSON.parse(ref.children.props.children);
    let requestBody = JSON.stringify({
      size: [
        Math.ceil(this.appInfo.length / this.numberOfColumns),
        Math.min(this.appInfo.length, this.numberOfColumns)
      ],
      pressed: [ 
        Math.floor(pressedApp.index / this.numberOfColumns),
        pressedApp.index % this.numberOfColumns
      ]
    });
    console.log(requestBody)
  }

  componentDidMount() {
    // this.connectRobo();
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
  appContainer: {
    marginBottom: 8,
    marginLeft: 13.5,
    marginRight: 13.5
  },
  appImage: {
    height: 60,
    width: 60
  },
  appTitle: {
    width: 60,
    color: 'white',
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingTop: 5
  },
  appMask: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 14,
    opacity: 0.0,
    backgroundColor: 'black'
  },
  appMetaData: {
    height: 0,
    width: 0
  }
});
