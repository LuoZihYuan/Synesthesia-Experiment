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
  // headerMode: 'none',
  mode: 'modal'
});

export default App;
