import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    maxWidth: 940,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3.5),
    },
  },
  chainDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: theme.spacing(3.75),

    [theme.breakpoints.down('lg')]: {
      gap: theme.spacing(2),
    },
  },
}));
