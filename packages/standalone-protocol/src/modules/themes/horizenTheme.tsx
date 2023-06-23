import { createMuiTheme, fade, lighten } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { Themes } from './types';
import { createTheme } from './createTheme';

export const FONTS = {
  primary: ['SF UI Display', 'Arial', 'sans-serif'].join(','),
};

export const PALETTE: PaletteOptions = {
  type: Themes.dark,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: lighten('#69D693', 0.1),
    main: '#69D693',
    dark: '#DF61E3',
  },
  background: {
    default: '#0C0C1B',
    paper: '#151528',
  },
  text: {
    primary: '#fff',
    secondary: '#0C0E11',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#4DB58F',
    light: fade('#4DB58F', 0.15),
  },
  warning: {
    main: '#EEA941',
  },
  error: {
    main: '#E3453D',
    light: fade('#E3453D', 0.15),
  },
  grey: {
    100: '#343641',
    200: '#3D4357',
    300: '#3E3E42',
    500: '#DCDDE0',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const horizenTheme = createTheme(defaultTheme);
