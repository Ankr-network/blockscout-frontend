import { createMuiTheme, darken } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { Themes } from './types';
import { createTheme } from './createTheme';

export const PALETTE: PaletteOptions = {
  type: Themes.dark,
  primary: {
    main: '#FF9211',
    dark: darken('#E54500', 0.1),
  },
  background: {
    default: '#121212',
    paper: '#121212',
  },
  grey: {
    100: '#292D32',
    200: '#333333',
    300: '#3E3E42',
    500: '#808080',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE,
});

export const coreTheme = createTheme(defaultTheme);
