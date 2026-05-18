import React, {useEffect} from 'react';

import {
  View,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  fetchTasks,
  toggleTask,
} from '../redux/taskSlice';

import {RootState, AppDispatch} from '../redux/store';
import {getTasksFromStorage} from '../utils/storage';

import {setOfflineTasks} from '../redux/taskSlice';

import {useAppTheme} from '../theme/ThemeProvider';
import TaskItem from '../component/TaskItem';

const TaskListScreen = ({navigation}: any) => {
  const theme = useAppTheme();

  const dispatch = useDispatch<AppDispatch>();

  const {tasks, loading, page} = useSelector(
    (state: RootState) => state.tasks,
  );

  useEffect(() => {
  loadTasks();
}, []);

const loadTasks = async () => {
  try {
    await dispatch(fetchTasks(1)).unwrap();
  } catch (error) {
    console.log('Offline Mode');

    const offlineTasks = await getTasksFromStorage();

    dispatch(setOfflineTasks(offlineTasks));
  }
};

  const loadMore = () => {
    dispatch(fetchTasks(page + 1));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 16,
      }}>
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('AddTask')}
      />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TaskItem
            item={item}
            onPress={() => dispatch(toggleTask(item.id))}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={() => dispatch(fetchTasks(1))}
        ListFooterComponent={
          loading ? <ActivityIndicator /> : null
        }
      />
    </View>
  );
};

export default TaskListScreen;