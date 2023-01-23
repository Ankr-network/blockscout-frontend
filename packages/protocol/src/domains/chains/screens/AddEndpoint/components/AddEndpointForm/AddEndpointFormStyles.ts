import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2 * 5),
    maxWidth: 820,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  top: {
    marginBottom: theme.spacing(2 * 5),
    color: theme.palette.text.primary,
    padding: 0,
  },
  bottom: {
    maxWidth: '40%',

    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing(2 * 2),
      maxWidth: '100%',
    },
  },
  divider: {
    margin: theme.spacing(2 * 3.5, 0),
  },
}));
