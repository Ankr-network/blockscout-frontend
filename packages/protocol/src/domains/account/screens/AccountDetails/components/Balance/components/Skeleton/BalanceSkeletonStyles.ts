import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(2 * 1.75),
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  title: {
    width: theme.spacing(2 * 7),
    height: theme.spacing(2 * 2.5),
  },
  currency: {
    width: theme.spacing(2 * 6),
    height: theme.spacing(2 * 3),
  },
  withdrawButton: {
    width: theme.spacing(2 * 8),
    height: theme.spacing(2 * 2.5),
  },
  balance: {
    width: theme.spacing(2 * 25),
    height: theme.spacing(2 * 6.5),
    marginBottom: theme.spacing(2 * 4.75),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2 * 20),
      height: theme.spacing(2 * 5),

      marginBottom: theme.spacing(2 * 4.125),
    },
  },
}));
