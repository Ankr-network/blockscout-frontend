import { createMuiTheme, darken, fade, lighten } from '@material-ui/core';
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
    light: lighten('#A0E2E0', 0.1),
    main: '#A0E2E0',
    dark: darken('#A0E2E0', 0.1),
  },
  background: {
    default: '#2E343C',
    paper: '#202226',
  },
  text: {
    primary: '#fff',
    secondary: '#1F2226',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#00E395',
    light: fade('#00E395', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    100: '#343641',
    200: '#3D4357',
    300: '#3E3E42',
    500: '#DCDDE0',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const erigonTheme = createTheme(defaultTheme);
