import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { app } from '../reducer/app';
import { botApi } from '../reducer/botApi';

export const store = configureStore({
   reducer: {
      app: app.reducer,
      [botApi.reducerPath]: botApi.reducer
   },
   middleware: getDefaultMiddleware =>
     getDefaultMiddleware().concat(botApi.middleware)
  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;