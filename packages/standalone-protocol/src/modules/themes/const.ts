import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { fade, lighten } from '@material-ui/core';

export enum Themes {
  light = 'light',
  dark = 'dark',
}

/**
 * additional breakpoint names taked from
 * https://en.wikipedia.org/wiki/Display_resolution#Common_display_resolutions
 */
export const BREAKPOINTS = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    HD: 1366,
    WXGAPlus: 1440,
    HDPlus: 1600,
  },
};

export const BTN_TRANSITION_TIME = 0.25;

export const FONTS = {
  primary: ['SF UI Display', 'Arial', 'sans-serif'].join(','),
  ttFirsNeueSemiBold: ['TT Firs Neue', 'sans-serif'].join(','),
};

export const PALETTE: PaletteOptions = {
  type: Themes.light,
  common: {
    white: '#fff',
    black: '#000',
  },
  primary: {
    light: lighten('#356DF3', 0.1),
    main: '#356DF3',
    dark: '#2A5BD1',
  },
  background: {
    default: '#F2F5FA',
    paper: '#fff',
  },
  text: {
    primary: '#1F2226',
    secondary: '#9AA1B0',
  },
  action: {
    disabled: '#BFC6D0',
    disabledBackground: '#E2E8F3',
  },
  success: {
    main: '#4DB58F',
    light: fade('#4DB58F', 0.15),
  },
  error: {
    main: '#E3453D',
    light: fade('#E3453D', 0.15),
  },
  warning: {
    main: '#EEA941',
  },
  grey: {
    400: '#E7EBF3',
    500: '#808692',
    600: '#82899A',
    700: '#2E343C',
    800: '#1F2226',
    900: '#DFE3EB',
  },
  divider: '#E0E6EF',
};
