import { makeStyles } from 'tss-react/mui';

export const useGreetingStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    color: theme.palette.text.primary,
  },
  title: {
    letterSpacing: '-0.04em',

    [theme.breakpoints.down(1100)]: {
      fontSize: 35,
    },
  },
}));
