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
    light: '#8686D2',
    main: '#112DF5',
    dark: '#6CB4CC',
  },
  background: {
    default: '#fff',
    paper: '#fcfcfc',
  },
  text: {
    primary: '#1F2226',
    secondary: '#dcdcdc',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#112DF5',
    light: fade('#112DF5', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    300: '#ECECEC',
    500: fade('#212121', 0.5),
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const ethTheme = createTheme(defaultTheme);
