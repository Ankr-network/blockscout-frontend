import { Theme } from '@mui/material';

export type FontSize = 's' | 'm' | 'l';

export const getFontSize = (size: FontSize, theme: Theme) => {
  if (size === 's') {
    return theme.spacing(2 * 1.75);
  }

  if (size === 'm') {
    return theme.spacing(2 * 2.5);
  }

  return theme.spacing(2 * 4.375);
};
