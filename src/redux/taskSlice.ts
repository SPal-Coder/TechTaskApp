import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import {Task} from '../types/task';

import {saveTasksToStorage} from '../utils/storage';

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
  async ({
    page,
    isRefreshing = false,
  }: {
    page: number;
    isRefreshing?: boolean;
  }) => {
    const limit = 10;

    const skip = (page - 1) * limit;

    const response = await fetch(
      `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();

    return {
      todos: data.todos,
      page,
      isRefreshing,
    };
  },
);

const taskSlice = createSlice({
  name: 'tasks',

  initialState,

  reducers: {
    toggleTask(state, action: PayloadAction<number>) {
      const index = state.tasks.findIndex(
        item => item.id === action.payload,
      );

      if (index !== -1) {
        state.tasks[index].completed =
          !state.tasks[index].completed;
      }

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

      .addCase(fetchTasks.pending, (state, action) => {
        const isRefreshing =
          action.meta.arg.isRefreshing;

        if (isRefreshing) {
          state.refreshing = true;
        } else {
          state.loading = true;
        }
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;

        const {todos, page, isRefreshing} =
          action.payload;

        if (isRefreshing) {
          state.tasks = todos;
        } else {
          const uniqueTasks = todos.filter(
            newItem =>
              !state.tasks.some(
                item => item.id === newItem.id,
              ),
          );

          state.tasks = [
            ...state.tasks,
            ...uniqueTasks,
          ];
        }

        state.page = page;

        saveTasksToStorage(state.tasks);
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;

        state.error =
          action.error.message ||
          'Something went wrong';
      });
  },
});

export const {
  toggleTask,
  addTask,
  resetTasks,
  setOfflineTasks,
} = taskSlice.actions;

export default taskSlice.reducer;