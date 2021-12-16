import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(3, 3, 2),
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
}));
