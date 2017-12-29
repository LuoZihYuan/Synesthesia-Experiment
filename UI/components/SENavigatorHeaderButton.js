// Standard React Library
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
// Third Party Library
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SENavigatorHeaderButton extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    icon: 'md-menu',
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon.Button
          name={this.props.icon}
          size={35}
          color="#4F8EF7"
          activeOpacity={0.0}
          backgroundColor="transparent"
          underlayColor="transparent"
          onPress={this.props.onPress}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // position absolutely in the top left corner
    ...StyleSheet.absoluteFillObject,
    top: 16.5,
    left: 2,
    width: 46.5,
    backgroundColor: 'transparent'
  }
});
