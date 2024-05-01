
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Routes from './src/routes';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';


function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <Routes />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </Provider>
  );
}

export default App;
