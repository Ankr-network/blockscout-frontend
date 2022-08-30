import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),

    padding: theme.spacing(3.75),

    borderRadius: theme.spacing(3),

    background: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(2),
    },

    [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(2),

      padding: theme.spacing(2.5),

      borderRadius: theme.spacing(2.5),
    },
  },
  title: {
    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2.5),
    lineHeight: `${theme.spacing(3.5)}px`,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
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
