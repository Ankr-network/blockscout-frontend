import { createMuiTheme, fade, lighten, darken } from '@material-ui/core';
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
    main: '#5C26F5',
    dark: darken('#5C26F5', 0.1),
  },
  background: {
    default: '#F5F5F5',
    paper: '#fff',
  },
  text: {
    primary: '#212121',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#4EA0EA',
    light: fade('#B2CE67', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    200: '#EAEAEA',
    300: '#E9E9E9',
    500: '#676767',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const arbitrumTheme = createTheme(defaultTheme);
