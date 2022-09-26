import { ThemeColors } from 'web3modal';
import { alpha, lighten } from '@material-ui/core/styles';

import { PALETTE } from 'ui';

export const web3ModalTheme = {
  background: PALETTE.background?.default,
  main: PALETTE.text?.primary,
  secondary: PALETTE.text?.primary && alpha(PALETTE.text.primary, 0.5),
  border: PALETTE.background?.paper,
  hover:
    PALETTE.background?.default && lighten(PALETTE.background.default, 0.03),
} as ThemeColors;
