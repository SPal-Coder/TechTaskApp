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
      Alert.alert(
        'Task should be minimum 3 characters',
      );

      return;
    }

    dispatch(
      addTask({
        id: Date.now(),
        todo: title,
        completed: false,
        isLocal: true,
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
        placeholder="Enter Task"
        placeholderTextColor="gray"
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 10,
          padding: 14,
          color: theme.text,
          marginBottom: 20,
        }}
      />

      <Button
        title="Save Task"
        onPress={handleAdd}
      />
    </View>
  );
};

export default AddTaskScreen;