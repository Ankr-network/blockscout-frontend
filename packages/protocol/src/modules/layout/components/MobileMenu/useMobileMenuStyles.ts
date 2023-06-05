import { makeStyles } from 'tss-react/mui';

export const useMobileMenuStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderWidth: 0,
    [`& svg`]: {
      color: theme.palette.primary.main,
    },
  },
  paper: {
    borderRadius: 0,
  },
}));
