import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import TabNavigator from './src/navigation/TabNavigator'
import { store } from './src/store'
import { useAppTheme } from './src/theme'

function RootApp() {
  const { statusBarStyle } = useAppTheme()
  return (
    <SafeAreaProvider>
      <StatusBar style={statusBarStyle} />
      <TabNavigator />
    </SafeAreaProvider>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  )
}