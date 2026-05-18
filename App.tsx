import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigations/AppNavigator'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator/>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App