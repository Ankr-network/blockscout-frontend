import { createMuiTheme, darken, fade } from '@material-ui/core';
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
    light: '#D2E8E7',
    main: '#62C6B8',
    dark: darken('#62C6B8', 0.1),
  },
  background: {
    default: '#121A1A',
    paper: '#000',
  },
  text: {
    primary: '#fff',
    secondary: '#000',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#62C6B8',
    light: fade('#62C6B8', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    100: '#333',
    200: '#333333',
    300: '#232323',
    500: '#808080',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const mantleTheme = createTheme(defaultTheme);
