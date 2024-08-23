import { makeStyles } from 'tss-react/mui';

export const useGreetingStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    // Used warning contrast text color since it is the same color in both
    // light and dark mode. The text is written on light background so it must
    // always be of some dark color
    color: theme.palette.warning.contrastText,
  },
  title: {
    letterSpacing: '-0.04em',

    [theme.breakpoints.down(1100)]: {
      fontSize: 35,
    },
  },
}));
