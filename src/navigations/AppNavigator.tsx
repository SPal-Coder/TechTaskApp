import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import { useAppTheme } from '../theme/ThemeProvider';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    const theme = useAppTheme();
  return (
   <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },

        headerTintColor: theme.text,

        headerTitleStyle: {
          color: theme.text,
        },

        contentStyle: {
          backgroundColor: theme.background,
        },
      }}>
    <Stack.Screen name="TaskList" component={TaskListScreen} />
     <Stack.Screen name="AddTask" component={AddTaskScreen} />
   </Stack.Navigator>
  )
}

export default AppNavigator