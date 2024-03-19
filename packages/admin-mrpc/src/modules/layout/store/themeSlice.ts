import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Themes } from '@ankr.com/ui';

import { RootState } from 'store';

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

export const selectIsLightTheme = createSelector(
  selectTheme,
  theme => theme === Themes.light,
);

export const { setTheme } = themeSlice.actions;
