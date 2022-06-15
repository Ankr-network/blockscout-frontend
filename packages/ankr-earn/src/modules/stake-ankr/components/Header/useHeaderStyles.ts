import { makeStyles } from '@material-ui/core';

export const useHeaderStyles = makeStyles(
  theme => ({
    icon: {
      margin: theme.spacing(0, 1),

      [theme.breakpoints.up('sm')]: {
        fontSize: 28,
      },
    },
  }),
  { index: 1 },
);
