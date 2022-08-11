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
    flexGrow: 1,
    maxWidth: '100%',
  },
  chainRequestsOverview: {
    marginTop: theme.spacing(7.5),
  },
}));
