import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(3, 3, 0),

    marginTop: theme.spacing(3.5),
    marginBottom: theme.spacing(3.5),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      marginTop: theme.spacing(2),
    },
  },

  mapContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing(-3),

    '& path:focus': {
      outline: 'none',
    },
  },
  stats: {
    marginTop: theme.spacing(5),
    paddingRight: theme.spacing(0.5),

    [theme.breakpoints.down('md')]: {
      marginTop: 0,
      paddingRight: 0,
      paddingBottom: theme.spacing(3),
    },
  },

  table: {
    background: theme.palette.background.default,
  },
  row: {
    '& td': { border: 0 },
  },
  requests: {
    fontWeight: 600,
  },

  country: {
    display: 'flex',
  },
  firstCell: {
    display: 'inline-flex',
    alignItems: 'center',
    minWidth: '120px',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  secondCell: {
    minWidth: '40%',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    textAlign: 'right',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    marginRight: 10,
  },
}));
