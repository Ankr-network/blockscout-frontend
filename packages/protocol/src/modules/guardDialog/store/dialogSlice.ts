import { createSlice } from '@reduxjs/toolkit';

export interface IDialogState {
  shouldShowDialog?: string;
}

const initialState: IDialogState = {
  shouldShowDialog: undefined,
};

export const guardDialogSlice = createSlice({
  name: 'guardDialog',
  initialState,
  reducers: {
    showDialog: () => {
      return {
        shouldShowDialog: 'true',
      }
    },
    hideDialog: () => initialState,
  },
});
