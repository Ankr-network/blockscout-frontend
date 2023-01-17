import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  top: {
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  title: {
    fontSize: 16,
    flexShrink: 0,
  },
  preloader: {
    height: theme.spacing(2 * 8.25),
  },
}));
