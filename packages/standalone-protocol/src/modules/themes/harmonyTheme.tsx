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
    light: '#8ff4c2',
    main: '#4eafe2',
    dark: '#000',
  },
  background: {
    default: '#fff',
    paper: '#fff',
  },
  text: {
    primary: '#000000',
    secondary: '#f9f9f9',
  },
  action: {
    disabledBackground: '#f9f9f9',
  },
  success: {
    main: '#4babe2',
    light: fade('#4babe2', 0.15),
  },
  error: {
    main: '#f2a671',
    light: fade('#f2a671', 0.15),
  },
  grey: {
    300: '#f4f4f6',
    500: '#757993',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const harmonyTheme = createTheme(defaultTheme);
