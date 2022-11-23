/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

type ShareModal = {
   status: boolean;
   url?: string;
};
export interface InitialState {
   token?: string;
   session?: string;
   shareModal: ShareModal;
}

const initialState: InitialState = {
   shareModal: {
      url: '',
      status: false,
   },
};
// FLAT REDUCER
export const app = createSlice({
   name: 'app',
   initialState,
   reducers: {
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

      setShareModal: (state, action: PayloadAction<ShareModal>) => {
         return produce(state, (draftstate: InitialState) => {
            draftstate.shareModal.status = action.payload.status;
            draftstate.shareModal.url = action.payload.url;
         });
      },
   },
});
export const { setSession, setToken, setShareModal } = app.actions;
