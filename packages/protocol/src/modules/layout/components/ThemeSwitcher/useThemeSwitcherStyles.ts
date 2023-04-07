import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useThemeSwitcherStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderWidth: 0,
    [`& svg`]: {
      color: theme.palette.grey[600],
    },
  },
}));
