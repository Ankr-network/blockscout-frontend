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
    main: '#041426',
    dark: darken('#041426', 0.1),
  },
  background: {
    default: '#CDCDCD',
    paper: '#CDCDCD',
  },
  text: {
    primary: '#041426',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#3F8C75',
    light: fade('#3F8C75', 0.15),
  },
  error: {
    main: '#D96D49',
    light: fade('#D96D49', 0.15),
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

export const gnosisTheme = createTheme(defaultTheme);
