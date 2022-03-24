import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  text: {
    fontWeight: 600,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },

  copyToClip: {
    minWidth: 330,
    height: 52,
    width: '100%',
    borderRadius: 16,

    '& h6': {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    marginTop: theme.spacing(3),
  },
  link: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  section: {
    display: 'flex',
    gap: theme.spacing(2),

    flex: 1,

    minWidth: 0,
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));
