import { createMuiTheme, fade } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { createTheme } from './createTheme';
import { Themes } from './types';

export const FONTS = {
  primary: ['Inter', 'Arial', 'sans-serif'].join(','),
};

export const PALETTE: PaletteOptions = {
  type: Themes.dark,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: '#9E1F19',
    main: '#C1121F',
    dark: '#8CABA9',
  },
  background: {
    default: '#001B2A',
    paper: '#000A0F',
  },
  text: {
    primary: '#fff',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#8CABA9',
    light: fade('#8CABA9', 0.15),
  },
  error: {
    main: '#C1121F',
    light: fade('#C1121F', 0.15),
  },
  grey: {
    200: '#DFE9FD',
    300: '#535863',
    500: '#9AA1B0',
    800: '#ECEDEE',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const seiTheme = createTheme(defaultTheme);
