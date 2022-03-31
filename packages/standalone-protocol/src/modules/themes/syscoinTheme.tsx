import { createMuiTheme, fade } from '@material-ui/core';
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
    light: '#EAEAEA',
    main: '#41919E',
    dark: '#A691C4',
  },
  background: {
    default: '#fff',
    paper: '#fff',
  },
  text: {
    primary: '#1F2226',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#3281F6',
    light: fade('#3281F6', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    200: '#DFE9FD',
    300: 'rgba(0, 0, 0, 0.1)',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const syscoinTheme = createTheme(defaultTheme);
