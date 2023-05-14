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
    light: lighten('#FF1256', 0.1),
    main: '#FF1256',
    dark: '#000',
  },
  background: {
    default: '#fff',
    paper: '#fff',
  },
  text: {
    primary: '#000',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#7AD24C',
    light: fade('#7AD24C', 0.15),
  },
  error: {
    main: '#FF1256',
    light: fade('#FF1256', 0.15),
  },
  grey: {
    100: '#F9F9F9',
    300: '#E9E9E9',
    500: '#595959',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const chilizTheme = createTheme(defaultTheme);
