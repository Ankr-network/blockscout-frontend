import { createMuiTheme, fade, lighten } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { Themes } from './types';
import { createTheme } from './createTheme';

export const FONTS = {
  primary: ['SF UI Display', 'Arial', 'sans-serif'].join(','),
};

const SUCCESS_MAIN = '#6ED396';
const ERROR_MAIN = '#4977EA';

export const TENET_LINEAR_GRADIENT_COLOR = `linear-gradient(90deg, ${SUCCESS_MAIN} 0%, ${ERROR_MAIN} 100%)`;

export const PALETTE: PaletteOptions = {
  type: Themes.dark,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: lighten(SUCCESS_MAIN, 0.1),
    main: SUCCESS_MAIN,
    dark: ERROR_MAIN,
  },
  background: {
    default: '#1F2226',
    paper: '#000',
  },
  text: {
    primary: '#fff',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: SUCCESS_MAIN,
    light: fade(ERROR_MAIN, 0.15),
  },
  error: {
    main: ERROR_MAIN,
    light: fade(ERROR_MAIN, 0.15),
  },
  grey: {
    300: '#9AA1B0',
    500: '#9AA1B0',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const tenetTheme = createTheme(defaultTheme);
