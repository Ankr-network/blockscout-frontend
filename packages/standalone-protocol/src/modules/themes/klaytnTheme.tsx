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
    light: '#FFDEC6',
    main: '#FF2F00',
    dark: '#6CB4CC',
  },
  background: {
    default: '#fff',
    paper: '#fff',
  },
  text: {
    primary: '#333',
    secondary: fade('#333', 0.5),
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#00e396',
    light: fade('#112DF5', 0.15),
  },
  error: {
    main: '#FF2F00',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    300: '#E2E2E2',
    500: fade('#212121', 0.5),
    600: '#FFFBF5',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const klaytnTheme = createTheme(defaultTheme);
