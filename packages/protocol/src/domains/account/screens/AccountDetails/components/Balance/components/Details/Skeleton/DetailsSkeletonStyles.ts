import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(2 * 0.375, 2 * 1.125),
  },
  marker: {
    width: theme.spacing(2 * 1.5),
    height: theme.spacing(2 * 1.5),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2 * 1.25),
      height: theme.spacing(2 * 1.25),
    },
  },
  usdBalance: {
    width: theme.spacing(2 * 9),
    height: theme.spacing(2 * 2.5),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2 * 7.5),
      height: theme.spacing(2 * 2),
    },
  },
  description: {
    width: theme.spacing(2 * 43),
    height: theme.spacing(2 * 2.5),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2 * 35),
      height: theme.spacing(2 * 2),
    },
  },
}));
