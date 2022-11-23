import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

export interface InitialState {
   token?: string;
   session?: string;
}

const initialState: InitialState = {};
// FLAT REDUCER
export const app = createSlice({
   name: 'app',
   initialState,
   reducers: {
      test: (state, action: PayloadAction<number>) => {
         return produce(state, (draftstate: { test: number }) => {
            draftstate.test = 2;
         });
      },
      setSession: (state, action: PayloadAction<string>) => {
         return produce(state, (draftstate: InitialState) => {
            draftstate.session = action.payload;
         });
      },
      setToken: (state, action: PayloadAction<string>) => {
         return produce(state, (draftstate: InitialState) => {
            draftstate.token = action.payload;
         });
      },
   },
});
export const { test, setSession, setToken } = app.actions;
