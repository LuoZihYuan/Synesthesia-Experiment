// Third Party Library
import { StackNavigator } from 'react-navigation'
// Dependent Module
import SEMainScreen from './screens/SEMainScreen'
import SESettingScreen from './screens/SESettingScreen'

const App = StackNavigator({
  Main: {
    screen: SEMainScreen
  },
  Settings: {
    screen: SESettingScreen
  }
}, {
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false
  }
});

export default App;
