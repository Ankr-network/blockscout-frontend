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
    light: '#EAEAEA',
    main: '#E8504A',
    dark: '#5596DC',
  },
  background: {
    default: '#1A2128',
    paper: '#151A20',
  },
  text: {
    primary: '#fff',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#4CBEB3',
    light: fade('#4CBEB3', 0.15),
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

export const secretTheme = createTheme(defaultTheme);
