import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import ProfileStack from './ProfileStack'
import TaskStack from './TaskStack'
import { useAppTheme } from '../theme'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const { colors } = useAppTheme()

  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarShowLabel: true,
          tabBarStyle: {
            borderTopColor: colors.border,
            backgroundColor: colors.surface,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.06,
            shadowRadius: 8
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            marginBottom: 4
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={TaskStack}
          options={{
            title: 'Tareas',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'checkbox' : 'checkbox-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    
  )
}

export default TabNavigator
