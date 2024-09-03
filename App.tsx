/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Provider} from 'react-redux';

import Routes from './app/routes';
import store from './app/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastProvider} from 'react-native-toast-notifications';

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView className="flex-1">
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <ToastProvider>
                <Routes />
              </ToastProvider>
            </Provider>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default App;
