import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gridGap: theme.spacing(2 * 2.5),
    justifyContent: 'space-between',
    padding: theme.spacing(2 * 3.75),
    borderRadius: 30,

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderRadius: 20,
      padding: theme.spacing(2 * 2.5),
    },
  },
  email: {
    fontSize: 34,
    fontWeight: 700,

    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
}));
