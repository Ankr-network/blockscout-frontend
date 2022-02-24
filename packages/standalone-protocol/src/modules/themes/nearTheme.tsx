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
    light: lighten('#33373B', 0.1),
    main: '#33373B',
    dark: '#000',
  },
  background: {
    default: '#F5F5F5',
    paper: '#fff',
  },
  text: {
    primary: '#1F2226',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#B2CE67',
    light: fade('#B2CE67', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    300: '#E9E9E9',
    500: '#676767',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const nearTheme = createTheme(defaultTheme);
