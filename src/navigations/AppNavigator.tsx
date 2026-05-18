import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name="TaskList" component={TaskListScreen} />
     <Stack.Screen name="AddTask" component={AddTaskScreen} />
   </Stack.Navigator>
  )
}

export default AppNavigator