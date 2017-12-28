import { StackNavigator } from 'react-navigation'

import SEMainScreen from './SEMainScreen'
import SESettingScreen from './SESettingScreen'

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
