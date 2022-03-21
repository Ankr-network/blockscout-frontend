import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  text: {
    fontWeight: 600,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  tooltip: {
    marginBottom: theme.spacing(2),
  },
  copyToClip: {
    minWidth: 330,
    width: '100%',

    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  root: {
    display: 'flex',
    gap: theme.spacing(2),
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(3)}px`,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  link: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  section: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));
