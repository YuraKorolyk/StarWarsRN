import {configureStore} from '@reduxjs/toolkit';
import {peopleReducer} from './slices/people.slice';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
