import { makeStyles } from 'tss-react/mui';

export const useConnectWaletDialogStyles = makeStyles()(theme => ({
  paper: {
    padding: theme.spacing(10),
  },
  icon: {
    color: theme.palette.error.main,
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',

    marginBottom: theme.spacing(7.5),
  },
  title: {
    marginBottom: theme.spacing(7.5),

    whiteSpace: 'pre-wrap',
    textAlign: 'center',
    letterSpacing: '-0.04em',

    fontWeight: 700,
    fontSize: 35,
    lineHeight: '40px',
  },
  description: {
    marginBottom: theme.spacing(7.5),

    textAlign: 'center',
    letterSpacing: '-0.01em',
    color: theme.palette.grey[800],
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '28px',
  },
  address: {
    marginBottom: theme.spacing(7.5),
  },
}));
