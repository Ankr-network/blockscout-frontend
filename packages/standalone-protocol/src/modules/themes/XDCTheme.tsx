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
    main: '#9FF3FF',
    dark: darken('#9FF3FF', 0.1),
  },
  background: {
    default: '#fff',
    paper: '#DBE6EB',
  },
  text: {
    primary: '#141619',
    secondary: '#687479',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#B1F1FD',
    light: fade('#B1F1FD', 0.15),
  },
  error: {
    main: '#F5C1AE',
    light: fade('#F5C1AE', 0.15),
  },
  warning: {
    main: '#ffdc9a',
  },
  grey: {
    200: '#EAEAEA',
    300: '#E9E9E9',
    500: '#141619',
    800: '#9AA1B0',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const XDCTheme = createTheme(defaultTheme);
