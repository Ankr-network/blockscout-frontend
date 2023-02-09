import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IUserConfigSlice {
  reminderConfigEmail: Record<string, boolean>;
}

const initialState: IUserConfigSlice = {
  reminderConfigEmail: {},
};

export const userConfigSlice = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    setReminderConfigEmail: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const address = action?.payload;

      if (address) {
        const { reminderConfigEmail } = state;

        reminderConfigEmail[address] = true;

        state.reminderConfigEmail = reminderConfigEmail;
      }
    },
  },
});

export const selectReminderEmailConfig = (state: RootState) =>
  state.userConfig.reminderConfigEmail;

export const { setReminderConfigEmail } = userConfigSlice.actions;
