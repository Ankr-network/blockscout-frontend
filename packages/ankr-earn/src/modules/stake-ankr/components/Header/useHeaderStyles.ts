import { makeStyles } from '@material-ui/core';

export const useHeaderStyles = makeStyles(
  theme => ({
    root: {
      display: 'grid',
      gap: theme.spacing(2.5, 3),

      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
      },
    },

    icon: {
      margin: theme.spacing(0, 1),

      [theme.breakpoints.up('sm')]: {
        fontSize: 28,
      },
    },
  }),
  { index: 1 },
);
