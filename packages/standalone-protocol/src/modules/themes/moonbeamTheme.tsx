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
    light: lighten('#CE347A', 0.1),
    main: '#CE347A',
    dark: '#66183C',
  },
  background: {
    default: '#2B2C45',
    paper: '#191430',
  },
  text: {
    primary: '#fff',
    secondary: '#DCDDE0',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#74C8C7',
    light: fade('#74C8C7', 0.15),
  },
  error: {
    main: '#E3453D',
    light: fade('#E3453D', 0.15),
  },
  grey: {
    300: '#3E3E42',
    500: '#DCDDE0',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const moonbeamTheme = createTheme(defaultTheme);
