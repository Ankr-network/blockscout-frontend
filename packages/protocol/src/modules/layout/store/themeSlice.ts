import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Themes } from '@ankr.com/ui';

export interface IThemeSlice {
  theme: Themes;
}

const initialState: IThemeSlice = {
  theme: Themes.light,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Themes>) => {
      state.theme = action.payload;
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.theme;

export const { setTheme } = themeSlice.actions;
