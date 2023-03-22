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
    light: lighten('#7C35E4', 0.1),
    main: '#7C35E4',
    dark: '#000',
  },
  background: {
    default: '#fff',
    paper: '#fff  ',
  },
  text: {
    primary: '#000',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#EBEDF0',
  },
  success: {
    main: '#17F095',
    light: fade('#17F095', 0.15),
  },
  error: {
    main: '#E3453D',
    light: fade('#E3453D', 0.15),
  },
  grey: {
    300: '#EBEDF0',
    500: '#595959',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const polygonZkevmTheme = createTheme(defaultTheme);
