import { createMuiTheme, fade, darken } from '@material-ui/core';
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
    light: '#FFEBDA',
    main: '#EE5132',
    dark: darken('#EE5132', 0.1),
  },
  background: {
    default: '#fff',
    paper: '#FFF8F3',
  },
  text: {
    primary: '#141619',
    secondary: '#687479',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#62E2D1',
    light: fade('#62E2D1', 0.15),
  },
  error: {
    main: '#EC5134',
    light: fade('#EC5134', 0.15),
  },
  warning: {
    main: '#EBC28E',
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

export const scrollTheme = createTheme(defaultTheme);
