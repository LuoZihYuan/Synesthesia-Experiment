// Standard React Library
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
// Third Party Library
import SettingsList from 'react-native-settings-list'
// Dependent Module
import SENavigatorHeaderButton from '../components/SENavigatorHeaderButton'

export default class SESettingScreen extends Component<{}> {
  static navigationOptions = {
    header: null
  }

  constructor(){
    super();
    this.state = {switchValue: false};
  }
  render() {
    var bgColor = '#DCE3F4';
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc', height:117}}>
          <View style={{flex: 1}}></View>
          <Text style={{alignSelf:'center',paddingBottom:6,fontWeight:'bold',fontSize:35}}>Settings</Text>
        </View>
        <SENavigatorHeaderButton
          style={{position: 'absolute'}}
          icon="md-close"
          onPress={() => {
            this.props.navigation.state.params.changeMode(this.state.mode);
            this.props.navigation.state.params.changeAddress(this.state.postAddress);
            this.props.navigation.goBack();
          }}
        />

        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../assets/images/control.png')}/>}
              title='Mode'
              titleInfo={this.state.mode}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => {
                if (this.state.mode === 'Location') {
                  this.setState({mode: 'Graph'});
                } else {
                  this.setState({mode: 'Location'});
                }
              }}
            />
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../assets/images/general.png')}/>}
              hasSwitch={true}
              switchState={this.state.random}
              switchOnValueChange={(random) => {
                this.setState({random: random});
                this.props.navigation.state.params.sortApp(random);
              }}
              hasNavArrow={false}
              title='Random'
            />
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../assets/images/display.png')}/>}
              title='Display'
              titleInfo={this.state.appCount.toString()}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => {
                let newValue = this.state.appCount + 1;
                if (newValue > 24) {
                  newValue -= 24;
                }
                this.props.navigation.state.params.changeAppCount(newValue);
                this.setState({
                  random: false,
                  appCount: newValue
                })
              }}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../assets/images/wifi.png')}/>}
              id="Address"
              title='Address'
              titleInfoStyle={styles.titleInfoStyle}
              isEditable={true}
              hasNavArrow={false}
              value={this.state.postAddress}
              onTextChange={(text) => {
                if (text) {
                  this.setState({postAddress: text});
                } else {
                  this.setState({postAddress: 'http://127.0.0.1:8000/'});
                }
              }}
            />
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../assets/images/bluetooth.png')}/>}
              title='Bluetooth'
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
            />
          </SettingsList>
        </View>
      </View>
    );
  }

  componentWillMount() {
    this.state.appCount = this.props.navigation.state.params.currentAppCount;
    this.state.random = this.props.navigation.state.params.randomOrder;
    this.state.mode = this.props.navigation.state.params.currentMode;
    this.state.postAddress = this.props.navigation.state.params.currentAddress;
  }
}

const styles = StyleSheet.create({
  imageStyle:{
    marginLeft:15,
    alignSelf:'center',
    height:30,
    width:30
  },
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  }
});
