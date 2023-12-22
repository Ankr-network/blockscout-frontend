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
    light: lighten('#F2D34F', 0.1),
    main: '#F2D34F',
    dark: darken('#F2D34F', 0.1),
  },
  background: {
    default: '#F6F7F8',
    paper: '#fff',
  },
  text: {
    primary: '#141619',
    secondary: '#0F0F0F',
  },
  action: {
    disabledBackground: '#BFC6D0',
  },
  success: {
    main: '#B4A9E1',
    light: fade('##B4A9E1', 0.15),
  },
  error: {
    main: '#47A0AD',
    light: fade('#47A0AD', 0.15),
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

export const stellarTheme = createTheme(defaultTheme);
