import React, {useState} from 'react';

import {
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import {useDispatch} from 'react-redux';

import {addTask} from '../redux/taskSlice';

import {useAppTheme} from '../theme/ThemeProvider';

const AddTaskScreen = ({navigation}: any) => {
  const theme = useAppTheme();

  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim().length < 3) {
      Alert.alert('Minimum 3 characters required');
      return;
    }

    dispatch(
      addTask({
        id: Date.now(),
        todo: title,
        completed: false,
      }),
    );

    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.background,
      }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task"
        placeholderTextColor="gray"
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          padding: 12,
          borderRadius: 10,
          color: theme.text,
          marginBottom:20,
        }}
      />

      <Button title="Save Task" onPress={handleAdd} />
    </View>
  );
};

export default AddTaskScreen;