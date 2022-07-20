import { ThemeColors } from 'web3modal';
import { fade, lighten } from '@material-ui/core';

import { PALETTE } from 'ui';

export const web3ModalTheme = {
  background: PALETTE.background?.default,
  main: PALETTE.text?.primary,
  secondary: PALETTE.text?.primary && fade(PALETTE.text.primary, 0.5),
  border: PALETTE.background?.paper,
  hover:
    PALETTE.background?.default && lighten(PALETTE.background.default, 0.03),
} as ThemeColors;
