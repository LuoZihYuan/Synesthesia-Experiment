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
  }

  render() {
    let appInfo = require('./assets/images/icons.json');
    // while(appInfo.length > 24) {
    //   appInfo.pop();
    // }

    return (
    <ImageBackground
      style={styles.container}
      source={require('./assets/images/background.jpg')}
    >
      <DropdownAlert
        ref={ref => this._userNotice.setDropDown(ref)}
      />
      
      <FlatList
        numColumns={4}
        style={styles.tableContainer}
        scrollEnabled={false}
        data={appInfo}
        renderItem={this._renderItem}
      />
      
    </ImageBackground>
    );
  }
  _renderItem = (item) => {
    let imageSource = Platform.select({
      ios: item.item.key,
      android: item.item.key.toLowerCase().replace(' ', '_')
    })
    return (
    <View
      style={styles.appContainer}
    >
      <Image style={styles.appImage}
        source={{uri: imageSource}}
      />
      <TouchableOpacity
        onPress={function(){console.log(JSON.parse(this.children.props.children))}}
        activeOpacity={0.35}
        style={styles.appMask}
      >
        <Text style={styles.appMask}>{JSON.stringify({index: item.index, key: item.item.key})}</Text>
      </TouchableOpacity>
      <Text
        style={styles.appTitle}
        numberOfLines={1}
      >
        {item.item.key}
      </Text>
    </View>
    );
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
  }
});
