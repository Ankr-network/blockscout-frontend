import { makeStyles } from 'tss-react/mui';

export const useTwoFASetupDialogStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
  backButton: {
    marginTop: theme.spacing(5),
  },
  title: {
    display: 'inline-block',
    paddingRight: theme.spacing(8),
  },
  paperRoot: {
    width: '100%',
  },
}));
