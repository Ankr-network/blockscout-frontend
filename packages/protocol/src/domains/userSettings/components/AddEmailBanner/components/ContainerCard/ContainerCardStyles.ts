import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    maxWidth: 618,
    padding: theme.spacing(2 * 4, 2 * 5, 2 * 5, 2 * 5),
    borderRadius: 32,

    [theme.breakpoints.down('xs')]: {
      borderRadius: 20,
      padding: theme.spacing(2 * 2.5),
    },
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
    marginBottom: theme.spacing(2 * 3),

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2 * 2.5),
      fontSize: 27,
    },
  },
}));
