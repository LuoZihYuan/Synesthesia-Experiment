// Standard React Library
import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
// Third Party Library
import DropdownAlert from 'react-native-dropdownalert'
import { BlurView } from 'react-native-blur'
// Dependent Module
import { SEUserNotice } from '../../Runtime/SEUserNotice';

export default class SEMainScreen extends Component<{}> {
  static navigationOptions = {
    header: null
  }

  _userNotice: SEUserNotice
  
  constructor() {
    super();
    this._userNotice = new SEUserNotice();
    this.numberOfColumns = 4;
    this.appInfo = require('../../assets/images/icons.json');
  }

  render() {
    while(this.appInfo.length > 16) {
      this.appInfo.pop();
    }

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../assets/images/background.jpg')}>
        <DropdownAlert ref={ref => this._userNotice.setDropDown(ref)}/>
        <FlatList
          numColumns={this.numberOfColumns}
          style={styles.tableContainer}
          scrollEnabled={false}
          data={this.appInfo}
          renderItem={this._renderItem}/>
        <View style={styles.footerContainer}>
          <BlurView
            style={styles.footerContainer}
            blurType='light'
            blurAmount={100}/>
          <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={styles.footerImage}
              source={{uri: 'Settings'}}/>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Settings')}
              activeOpacity={0.35}
              style={styles.appMask}>
            </TouchableOpacity>
          </View>
        </View>
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
    console.log(requestBody);

    fetch('http://192.168.1.103.xip.io:8000/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requestBody
    })
      .catch((erorr)=>{
        console.error(error);
      });
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
  footerContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 91.5
  },
  footerImage: {
    position: 'absolute',
    height: 67,
    width: 67,
    borderRadius: 13.7
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
    borderRadius: 13.7,
    opacity: 0.0,
    backgroundColor: 'black'
  },
  appMetaData: {
    height: 0,
    width: 0
  }
});
