import React from 'react';
import 'react-native-devsettings';
import {MainStack} from './src/navigation/MainStack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}

export default App;
