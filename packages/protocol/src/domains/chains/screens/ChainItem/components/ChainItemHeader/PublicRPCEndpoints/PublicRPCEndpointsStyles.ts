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
    flexDirection: 'column',
    gap: theme.spacing(2),

    margin: `${theme.spacing(2)}px 0 ${theme.spacing(3)}px`,
  },
  nervos: {
    display: 'flex',
    gap: theme.spacing(2),

    margin: `${theme.spacing(2)}px 0 ${theme.spacing(3)}px`,
  },
  link: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',

    width: '100%',
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
