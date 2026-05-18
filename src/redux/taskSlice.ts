import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../types/task';
import {
  saveTasksToStorage,
  getTasksFromStorage,
} from '../utils/storage';
interface TaskState {
  tasks: Task[];
  loading: boolean;
  refreshing: boolean;
  page: number;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  refreshing: false,
  page: 1,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (page: number) => {
    const limit = 10;
    const skip = (page - 1) * limit;

    const response = await fetch(
      `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();

    return data.todos;
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.map(item =>
        item.id === action.payload
          ? {...item, completed: !item.completed}
          : item,
      );
       saveTasksToStorage(state.tasks);
    },

    addTask(state, action: PayloadAction<Task>) {
      state.tasks.unshift(action.payload);
       saveTasksToStorage(state.tasks);
    },

    resetTasks(state) {
      state.tasks = [];
      state.page = 1;
    },
    setOfflineTasks(state, action) {
  state.tasks = action.payload;
},
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;

        const newTasks = action.payload;

        const uniqueTasks = newTasks.filter(
          newItem =>
            !state.tasks.some(item => item.id === newItem.id),
        );

        state.tasks = [...state.tasks, ...uniqueTasks];
         saveTasksToStorage(state.tasks);
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const {toggleTask, addTask, resetTasks, setOfflineTasks,} =
  taskSlice.actions;

export default taskSlice.reducer;