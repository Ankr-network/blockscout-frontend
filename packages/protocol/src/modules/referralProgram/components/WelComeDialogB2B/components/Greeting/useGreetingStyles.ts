import { makeStyles } from 'tss-react/mui';

export const useGreetingStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  title: {
    letterSpacing: '-0.03em',
  },
  benefits: {
    paddingLeft: theme.spacing(5),
  },
}));
