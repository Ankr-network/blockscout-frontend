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
    light: lighten('#53599a', 0.1),
    main: '#53599a',
    dark: '#356df3',
  },
  background: {
    default: '#fff',
    paper: '#F2F5FA',
  },
  text: {
    primary: '#1F2226',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#36b267',
    light: fade('#36b267', 0.15),
  },
  error: {
    main: '#53599a',
    light: fade('#53599a', 0.15),
  },
  grey: {
    300: '#E9E9E9',
    500: '#76808F',
  },
};

export const DARK_PALETTE: PaletteOptions = {
  type: Themes.dark,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: lighten('#53599a', 0.1),
    main: '#53599a',
    dark: '#356df3',
  },
  background: {
    default: '#1F2341',
    paper: '#121429',
  },
  text: {
    primary: '#fff',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#36b267',
    light: fade('#36b267', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    300: '#E9E9E9',
    500: '#6C727F',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: DARK_PALETTE,
});

export const zksyncEraTheme = createTheme(defaultTheme);
