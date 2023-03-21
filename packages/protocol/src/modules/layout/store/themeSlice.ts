import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Themes } from '@ankr.com/ui';

export interface IThemeSlice {
  theme: Themes;
  isSwitched?: boolean;
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
      state.isSwitched = true;
    },
    setIsSwitched: (state, action: PayloadAction<boolean>) => {
      state.isSwitched = action.payload;
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.theme;

export const selectIsLightTheme = createSelector(
  selectTheme,
  theme => theme === Themes.light,
);

export const selectIsSwitched = (state: RootState) => state.theme.isSwitched;

export const { setTheme, setIsSwitched } = themeSlice.actions;
