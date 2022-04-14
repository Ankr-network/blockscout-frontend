import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    background: theme.palette.common.white,
    padding: 40,
    maxWidth: 480,
    height: 486,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  stepper: {
    background: 'transparent',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 220,
    marginBottom: theme.spacing(4.5),
  },
  title: {
    marginBottom: theme.spacing(2.75),

    '&.h3': {
      fontSize: 28,
    },

    '& .icon': {
      verticalAlign: 'middle',
    },
  },
  notice: {
    fontWeight: 'lighter',
    minHeight: 45,
    marginBottom: theme.spacing(7.5),
  },
  button: {
    maxWidth: 210,
    marginTop: 'auto',
  },
}));
