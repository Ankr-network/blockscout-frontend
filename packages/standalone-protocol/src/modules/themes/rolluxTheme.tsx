import { createMuiTheme, fade, lighten } from '@material-ui/core';
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
    light: '#fff',
    main: '#DBEF88',
    dark: lighten('#000', 0.4),
  },
  background: {
    default: '#fff',
    paper: '#fff',
  },
  text: {
    primary: '#000',
    secondary: '#494949',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#36B267',
    light: fade('#112DF5', 0.15),
  },
  error: {
    main: '#FF2F00',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    300: '#E5E7EB',
    500: '#494949',
    600: '#E0E0E0',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const rolluxTheme = createTheme(defaultTheme);
