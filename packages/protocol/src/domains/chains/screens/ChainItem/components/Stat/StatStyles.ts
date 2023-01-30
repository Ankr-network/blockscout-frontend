import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStatStyles = makeStyles()((theme: Theme) => ({
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2 * 2),

    flex: 1,

    padding: theme.spacing(2 * 3, 2 * 3.75),

    borderRadius: theme.spacing(2 * 3),

    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2 * 2, 2 * 2.5),

      borderRadius: theme.spacing(2 * 2.5),
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 1.25),

    flex: 1,

    width: '100%',

    [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(2 * 0.5),
    },
  },
  title: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: theme.spacing(2 * 1.75),
    lineHeight: theme.spacing(2 * 2.5),
  },
  value: {
    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: theme.spacing(2 * 3.5),
    lineHeight: theme.spacing(2 * 4),

    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(2 * 2),
      lineHeight: theme.spacing(2 * 2.5),
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2 * 3.5),
      lineHeight: theme.spacing(2 * 4),
    },
  },
  skeleton: {
    width: '100%',
    height: theme.spacing(2 * 4),

    transform: 'none',

    [theme.breakpoints.down('lg')]: {
      height: theme.spacing(2 * 2.5),
    },

    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(2 * 4),
    },
  },
}));
