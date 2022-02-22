import { createMuiTheme, fade, lighten } from '@material-ui/core';
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
    light: lighten('#17F095', 0.1),
    main: '#17F095',
    dark: '#A169F6',
  },
  background: {
    default: '#26262B',
    paper: '#000',
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
  error: {
    main: '#E3453D',
    light: fade('#E3453D', 0.15),
  },
  grey: {
    300: '#3E3E42',
    500: '#76808F',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const solanaTheme = createTheme(defaultTheme);
