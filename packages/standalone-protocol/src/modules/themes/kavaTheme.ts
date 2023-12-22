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
    light: lighten('#FF433E', 0.1),
    main: '#FF433E',
    dark: darken('#FF433E', 0.1),
  },
  background: {
    default: '#11151B',
    paper: '#000000',
  },
  text: {
    primary: '#fff',
    secondary: '#fff',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#6FEAB5',
    light: fade('#6FEAB5', 0.15),
  },
  error: {
    main: '#FF6960',
    light: fade('#FF6960', 0.15),
  },
  grey: {
    100: '#333',
    200: '#333333',
    300: '#82899A',
    500: '#9AA1B0',
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

export const kavaTheme = createTheme(defaultTheme);
