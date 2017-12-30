// Standard React Library
import React, { Component } from 'react';
import {
  Alert,
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
    this._totalApps = require('../../assets/icons.json');
    this.state = {
      appInfo: this._totalApps.slice(),
      appCount: 16,
      randomOrder: false,
      mode: 'Location',
      postAddress: 'http://127.0.0.1:8000/'
    };
  }

  render() {
    while(this.state.appInfo.length > this.state.appCount) {
      this.state.appInfo.pop();
    }

    return (
      <ImageBackground
        style={styles.container}
        source={require('../../assets/images/background.jpg')}>
        <DropdownAlert ref={ref => this._userNotice.setDropDown(ref)}/>
        <FlatList
          extraData={this.state}
          numColumns={this.numberOfColumns}
          style={styles.tableContainer}
          scrollEnabled={false}
          data={this.state.appInfo}
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
              onPress={() => {
                this.props.navigation.navigate('Settings', {
                  currentAppCount: this.state.appCount,
                  changeAppCount: this.handleAppCountChangeRequest,
                  randomOrder: this.state.randomOrder,
                  sortApp: this.handleSortingRequest,
                  currentMode: this.state.mode,
                  changeMode: this.handleModeChangeRequest,
                  currentAddress: this.state.postAddress,
                  changeAddress: this.handleAddressChangeRequest
                })
              }}
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
      mode: this.state.mode,
      grid: [
        Math.ceil(this.state.appInfo.length / this.numberOfColumns),
        Math.min(this.state.appInfo.length, this.numberOfColumns)
      ],
      pressed: {
        name: pressedApp.key,
        loc: [
          Math.floor(pressedApp.index / this.numberOfColumns),
          pressedApp.index % this.numberOfColumns
        ]
      }
    });
    console.log(requestBody);

    fetch(this.state.postAddress, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requestBody
    }).catch((error) => Alert.alert(error.message));
  }

  handleAppCountChangeRequest = (amount) => {
    this.setState({
      appInfo: this._totalApps.slice(),
      appCount: Math.min(amount, 24),
      randomOrder: false
    });
  }
  handleSortingRequest = (random) => {
    if (random) {
      do {
        this.state.appInfo.sort(function(a, b){
          return 0.5 - Math.random()
        });
      } while(Math.random() > 0.2);
    } else {
      this.state.appInfo.sort(function(a, b){
        if (a.key > b.key) return 1;
        if (a.key < b.key) return -1;
        return 0;
      });
    }
    this.setState({
      randomOrder: random
    });
  }
  handleModeChangeRequest = (newMode) => {
    this.setState({mode: newMode});
  }
  handleAddressChangeRequest = (newAddress) => {
    this.setState({
      postAddress: newAddress
    });
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
