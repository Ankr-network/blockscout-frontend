import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    maxWidth: 940,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2 * 3.5),
    },
  },
  chainDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: theme.spacing(2 * 3.75),

    [theme.breakpoints.down('lg')]: {
      gap: theme.spacing(2 * 2),
    },
  },
}));
