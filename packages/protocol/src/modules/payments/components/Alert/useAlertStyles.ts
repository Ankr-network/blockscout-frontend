import { makeStyles } from 'tss-react/mui';

export const useAlertStyles = makeStyles()(theme => ({
  root: {
    alignItems: 'center',
    '& a': {
      textDecoration: 'underline',
    },
  },
  text: {
    color: theme.palette.grey[900],
  },
}));
