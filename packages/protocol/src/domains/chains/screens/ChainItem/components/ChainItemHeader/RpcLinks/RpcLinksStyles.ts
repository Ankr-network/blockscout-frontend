import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  text: {
    fontWeight: 600,
  },
  textPublic: {
    marginBottom: theme.spacing(2),
  },
  copyToClip: {
    minWidth: 330,
    width: '100%',
    marginRight: theme.spacing(1.25),

    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'initial',
    },
  },
  link: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
  section: {
    flexGrow: 1,
    maxWidth: '49%',

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      marginBottom: theme.spacing(2),
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));
