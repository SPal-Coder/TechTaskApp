import React, {useEffect} from 'react';

import {
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Text,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  fetchTasks,
  toggleTask,
  setOfflineTasks,
} from '../redux/taskSlice';

import {
  RootState,
  AppDispatch,
} from '../redux/store';

import {getTasksFromStorage} from '../utils/storage';

import {useAppTheme} from '../theme/ThemeProvider';

import TaskItem from '../component/TaskItem';

const TaskListScreen = ({navigation}: any) => {
  const theme = useAppTheme();

  const dispatch = useDispatch<AppDispatch>();

  const {
    tasks,
    loading,
    refreshing,
    page,
    error,
  } = useSelector(
    (state: RootState) => state.tasks,
  );

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      await dispatch(
        fetchTasks({
          page: 1,
        }),
      ).unwrap();
    } catch (error) {
      console.log('Offline Mode');

      const offlineTasks =
        await getTasksFromStorage();

      dispatch(setOfflineTasks(offlineTasks));
    }
  };

  const loadMore = () => {
    if (loading || refreshing) {
      return;
    }

    dispatch(
      fetchTasks({
        page: page + 1,
      }),
    );
  };

  const onRefresh = () => {
    dispatch(
      fetchTasks({
        page: 1,
        isRefreshing: true,
      }),
    );
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
        onPress={() =>
          navigation.navigate('AddTask')
        }
      />

      {error && (
        <Text
          style={{
            color: 'red',
            marginVertical: 10,
          }}>
          {error}
        </Text>
      )}

      <FlatList
        data={tasks}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={({item}) => (
          <TaskItem
            item={item}
            onPress={() =>
              dispatch(toggleTask(item.id))
            }
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          !loading ? (
            <Text
              style={{
                color: theme.text,
                marginTop: 30,
                textAlign: 'center',
              }}>
              No Tasks Found
            </Text>
          ) : null
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator />
          ) : null
        }
      />
    </View>
  );
};

export default TaskListScreen;