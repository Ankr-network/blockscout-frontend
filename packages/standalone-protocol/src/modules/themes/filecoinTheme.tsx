import { createMuiTheme, fade } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { Themes } from './types';
import { createTheme } from './createTheme';

export const FONTS = {
  primary: ['SF UI Display', 'Arial', 'sans-serif'].join(','),
};

export const PALETTE: PaletteOptions = {
  type: Themes.light,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: '#DAF3FE',
    main: '#3270BF',
    dark: '#000',
  },
  background: {
    default: '#fff',
    paper: '#F2F5FA',
  },
  text: {
    primary: '#333',
    secondary: '#eaeaea',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#0890FF',
    light: fade('#0890FF', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    300: '#e2e2e2',
    500: fade('#333', 0.5),
    700: '#f3f3f3',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const filecoinTheme = createTheme(defaultTheme);
