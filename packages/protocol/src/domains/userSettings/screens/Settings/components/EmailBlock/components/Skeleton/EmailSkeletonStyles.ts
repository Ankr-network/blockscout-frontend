import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  email: {
    width: theme.spacing(2 * 52),

    fontSize: 34,

    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
}));
