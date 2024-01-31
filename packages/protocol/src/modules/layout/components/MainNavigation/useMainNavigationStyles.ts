import { makeStyles } from 'tss-react/mui';

export const useMainNavigationStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
  },
  skeleton: {
    height: theme.spacing(6),
    margin: theme.spacing(3),

    borderRadius: theme.spacing(1.5),

    backgroundColor: theme.palette.background.default,
  },
}));
