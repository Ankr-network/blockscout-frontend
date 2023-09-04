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
    light: lighten('#F3B1D6', 0.1),
    main: '#F3B1D6',
    dark: '#000',
  },
  background: {
    default: '#F4F4F4',
    paper: '#fff',
  },
  text: {
    primary: '#242425',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#36B267',
    light: fade('#36B267', 0.15),
  },
  error: {
    main: '#D4395A',
    light: fade('#D4395A', 0.15),
  },
  grey: {
    300: '#E9E9E9',
    500: '#76808F',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const flareTheme = createTheme(defaultTheme);
