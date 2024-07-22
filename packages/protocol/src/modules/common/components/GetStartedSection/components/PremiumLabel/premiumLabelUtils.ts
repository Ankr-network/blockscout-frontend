import { Theme } from '@mui/material';

export type FontSize = 'xs' | 's' | 'm' | 'l';

export const getFontSize = (size: FontSize, theme: Theme) => {
  if (size === 'xs') {
    return theme.spacing(3);
  }

  if (size === 's') {
    return theme.spacing(3.5);
  }

  if (size === 'm') {
    return theme.spacing(5);
  }

  return theme.spacing(8.75);
};
