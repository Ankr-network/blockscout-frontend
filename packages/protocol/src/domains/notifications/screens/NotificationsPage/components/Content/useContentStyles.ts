import { makeStyles } from 'tss-react/mui';

export const useContentStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    height: '100%',

    [theme.breakpoints.down('md')]: {
      minHeight: 328,
    },
  },
}));
