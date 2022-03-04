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
    light: lighten('#6FEAB5', 0.1),
    main: '#6FEAB5',
    dark: darken('#6FEAB5', 0.1),
  },
  background: {
    default: '#000000',
    paper: '#000000',
  },
  text: {
    primary: '#fff',
    secondary: '#0C0E11',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#6FEAB5',
    light: fade('#6FEAB5', 0.15),
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

export const nervosTheme = createTheme(defaultTheme);
