import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../types/task';

const TASKS_KEY = 'TASKS';

export const saveTasksToStorage = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(
      TASKS_KEY,
      JSON.stringify(tasks),
    );
  } catch (error) {
    console.log('Save Error', error);
  }
};

export const getTasksFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Get Error', error);
    return [];
  }
};