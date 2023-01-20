import { createMuiTheme, darken, fade, lighten } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { Themes } from './types';
import { createTheme } from './createTheme';

export const PALETTE: PaletteOptions = {
  type: Themes.dark,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: lighten('#00e396', 0.1),
    main: '#00e396',
    dark: darken('#00e396', 0.1),
  },
  background: {
    default: '#1F2123',
    paper: '#0c0e10',
  },
  text: {
    primary: '#fff',
    secondary: '#0C0E11',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#00e396',
    light: fade('#00e396', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    100: '#333',
    200: '#333333',
    300: '#3E3E42',
    500: '#808080',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const fantomTheme = createTheme(defaultTheme);
