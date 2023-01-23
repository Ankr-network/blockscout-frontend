import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2 * 21, 2 * 2, 2 * 8),
    justifyContent: 'center',
  },

  title: {
    fontSize: 34,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing(2 * 3.5),

    [theme.breakpoints.up('md')]: {
      maxWidth: '75%',
    },
  },

  buttons: {
    margin: theme.spacing(2 * 2.5, 0),
    textAlign: 'center',
    maxWidth: 230,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    width: '100%',
    marginBottom: theme.spacing(2 * 2),
  },
}));
