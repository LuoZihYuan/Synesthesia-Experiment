// Standard React Library
import React, { Component } from 'react';
import {
  Alert,
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
    this.onValueChange = this.onValueChange.bind(this);
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
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Airplane Mode'
            />
            <SettingsList.Item
              title='Wi-Fi'
              titleInfo='Bill Wi The Science Fi'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Wifi Page')}
            />
            <SettingsList.Item
              title='Bluetooth'
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Blutooth Page')}
            />
            <SettingsList.Item
              title='Cellular'
              onPress={() => Alert.alert('Route To Cellular Page')}
            />
            <SettingsList.Item
              title='Personal Hotspot'
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route To Hotspot Page')}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Notifications'
              onPress={() => Alert.alert('Route To Notifications Page')}
            />
            <SettingsList.Item
              title='Control Center'
              onPress={() => Alert.alert('Route To Control Center Page')}
            />
            <SettingsList.Item
              title='Do Not Disturb'
              onPress={() => Alert.alert('Route To Do Not Disturb Page')}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='General'
              onPress={() => Alert.alert('Route To General Page')}
            />
            <SettingsList.Item
              title='Display & Brightness'
              onPress={() => Alert.alert('Route To Display Page')}
            />
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}

const styles = StyleSheet.create({
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  }
});
