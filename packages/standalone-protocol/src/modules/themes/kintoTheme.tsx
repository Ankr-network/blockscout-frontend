import { createMuiTheme, darken, fade, lighten } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { Themes } from './types';
import { createTheme } from './createTheme';

export const PALETTE: PaletteOptions = {
  type: Themes.light,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: lighten('#D96704', 0.1),
    main: '#D96704',
    dark: darken('#D96704', 0.1),
  },
  background: {
    default: '#F6F7F8',
    paper: '#fff',
  },
  text: {
    primary: '#0F0F0F',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#81A68A',
    light: fade('#81A68A', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    100: '#CDD9DF',
    200: '#333333',
    300: '#82899A',
    500: '#687479',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: `1px solid #CDD9DF`,
      },
    },
  },
});

export const kintoTheme = createTheme(defaultTheme);
