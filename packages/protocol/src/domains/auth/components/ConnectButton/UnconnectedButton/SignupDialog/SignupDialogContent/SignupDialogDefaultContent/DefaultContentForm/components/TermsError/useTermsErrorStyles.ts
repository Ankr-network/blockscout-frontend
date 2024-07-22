import { makeStyles } from 'tss-react/mui';

export const useTermsErrorStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    left: -2,

    display: 'inline-flex',
    alignItems: 'center',

    marginBottom: theme.spacing(3),

    color: theme.palette.error.main,

    fontWeight: 500,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));
