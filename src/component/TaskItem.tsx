import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Task} from '../types/task';
import {useAppTheme} from '../theme/ThemeProvider';

interface Props {
  item: Task;
  onPress: () => void;
}

const TaskItem = ({item, onPress}: Props) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: theme.card},
      ]}>
      <Text
        style={{
          color: theme.text,
          textDecorationLine: item.completed
            ? 'line-through'
            : 'none',
        }}>
        {item.todo}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
  },
});

export default TaskItem;