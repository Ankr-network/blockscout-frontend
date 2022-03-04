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
    light: lighten('#7950DD', 0.1),
    main: '#7950DD',
    dark: '#000',
  },
  background: {
    default: '#fff',
    paper: '#F2F5FA',
  },
  text: {
    primary: '#1F2226',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
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
    300: '#E9E9E9',
    500: '#76808F',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const polygonTheme = createTheme(defaultTheme);
